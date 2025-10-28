-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'farmer');

-- Create enum for crop types
CREATE TYPE public.crop_type AS ENUM (
  'maize', 'beans', 'potatoes', 'tomatoes', 'cabbage', 
  'wheat', 'rice', 'coffee', 'tea', 'sugarcane', 'other'
);

-- Create enum for alert severity
CREATE TYPE public.alert_severity AS ENUM ('info', 'warning', 'critical');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  farm_location TEXT,
  phone_number TEXT,
  farm_size_acres DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'farmer',
  UNIQUE(user_id, role)
);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create crops table
CREATE TABLE public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  crop_type crop_type NOT NULL,
  planted_date DATE NOT NULL,
  expected_harvest_date DATE,
  area_acres DECIMAL(10,2),
  status TEXT DEFAULT 'growing',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create weather_data table
CREATE TABLE public.weather_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  rainfall_mm DECIMAL(8,2),
  wind_speed DECIMAL(5,2),
  conditions TEXT,
  forecast_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create rainfall_records table
CREATE TABLE public.rainfall_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  date DATE NOT NULL,
  rainfall_mm DECIMAL(8,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create crop_advisory table
CREATE TABLE public.crop_advisory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_type crop_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  season TEXT,
  rainfall_requirement TEXT,
  best_planting_months TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rainfall_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_advisory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for crops
CREATE POLICY "Users can view their own crops"
ON public.crops FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own crops"
ON public.crops FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crops"
ON public.crops FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crops"
ON public.crops FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all crops"
ON public.crops FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for weather_data (read-only for all authenticated users)
CREATE POLICY "All authenticated users can view weather data"
ON public.weather_data FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage weather data"
ON public.weather_data FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for rainfall_records (read-only for all authenticated users)
CREATE POLICY "All authenticated users can view rainfall records"
ON public.rainfall_records FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage rainfall records"
ON public.rainfall_records FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for crop_advisory (read-only for all authenticated users)
CREATE POLICY "All authenticated users can view crop advisory"
ON public.crop_advisory FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage crop advisory"
ON public.crop_advisory FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for alerts
CREATE POLICY "Users can view their own alerts"
ON public.alerts FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own alerts"
ON public.alerts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all alerts"
ON public.alerts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.crops
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.crop_advisory
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'farmer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample crop advisory data
INSERT INTO public.crop_advisory (crop_type, title, description, season, rainfall_requirement, best_planting_months) VALUES
('maize', 'Maize Planting Guide', 'Plant maize at the onset of long rains. Requires well-drained soil and adequate spacing for optimal growth.', 'Long Rains', '500-800mm per season', ARRAY['March', 'April', 'October']),
('beans', 'Bean Cultivation Tips', 'Beans thrive in moderate rainfall. Plant during both rainy seasons for maximum yield.', 'Both Seasons', '400-600mm per season', ARRAY['March', 'April', 'September', 'October']),
('potatoes', 'Potato Growing Season', 'Potatoes require cool temperatures and consistent moisture. Best planted in highland areas.', 'Short Rains', '500-700mm per season', ARRAY['June', 'July', 'August']),
('tomatoes', 'Tomato Farming Best Practices', 'Tomatoes need moderate rainfall and plenty of sunshine. Stake plants for better yields.', 'Both Seasons', '400-600mm per season', ARRAY['March', 'April', 'September']);
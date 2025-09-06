-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has admin role
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = check_user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Drop the problematic policy
DROP POLICY "Admin can view all bookings" ON public.bookings;

-- Create new secure admin policy
CREATE POLICY "Only admins can view all bookings" 
ON public.bookings 
FOR SELECT 
USING (public.is_admin());

-- Allow users to view their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only allow admins to manage roles
CREATE POLICY "Only admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin());

-- Insert a default admin user (replace with actual user ID when needed)
-- This creates an admin role for the first authenticated user
INSERT INTO public.user_roles (user_id, role)
SELECT auth.uid(), 'admin'
WHERE auth.uid() IS NOT NULL
AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
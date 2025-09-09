-- Enable real-time updates for services table
ALTER TABLE public.services REPLICA IDENTITY FULL;

-- Add the services table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;

-- Update current user to admin (using the logged-in user's email)
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin'::app_role 
FROM auth.users 
WHERE email = 'fastsmart16@gmail.com' 
AND id NOT IN (SELECT user_id FROM public.user_roles WHERE role = 'admin');
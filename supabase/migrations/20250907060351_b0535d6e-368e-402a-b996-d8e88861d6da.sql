-- Add admin role for existing users
INSERT INTO public.user_roles (user_id, role) 
VALUES 
  ('b934c476-3f28-43ce-b721-dde686afba8c', 'admin'),
  ('b1d442c5-3f09-4cc2-aecd-de7816737fc6', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
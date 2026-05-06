DROP POLICY IF EXISTS "Public can view activity images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Everyone can view gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view gallery images" ON storage.objects;

CREATE POLICY "Admins can list gallery objects"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery' AND public.is_current_user_admin());

CREATE POLICY "Admins can list activity objects"
ON storage.objects FOR SELECT
USING (bucket_id = 'activities' AND public.is_current_user_admin());

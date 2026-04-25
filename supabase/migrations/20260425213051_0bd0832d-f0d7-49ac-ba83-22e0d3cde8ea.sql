CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::public.app_role
  );
$$;

CREATE OR REPLACE FUNCTION public.get_uploaded_by_if_admin(original_uploaded_by uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN public.is_current_user_admin() THEN original_uploaded_by
    ELSE NULL
  END;
$$;

DROP POLICY IF EXISTS "Admins can upload gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload activity images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update activity images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete activity images" ON storage.objects;

CREATE POLICY "Admins can upload gallery images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery' AND public.is_current_user_admin());

CREATE POLICY "Admins can update gallery images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_current_user_admin())
WITH CHECK (bucket_id = 'gallery' AND public.is_current_user_admin());

CREATE POLICY "Admins can delete gallery images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_current_user_admin());

CREATE POLICY "Admins can upload activity images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'activities' AND public.is_current_user_admin());

CREATE POLICY "Admins can update activity images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'activities' AND public.is_current_user_admin())
WITH CHECK (bucket_id = 'activities' AND public.is_current_user_admin());

CREATE POLICY "Admins can delete activity images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'activities' AND public.is_current_user_admin());

DROP POLICY IF EXISTS "Admins can insert activities" ON public.activities;
DROP POLICY IF EXISTS "Admins can update activities" ON public.activities;
DROP POLICY IF EXISTS "Admins can delete activities" ON public.activities;

CREATE POLICY "Admins can insert activities"
ON public.activities
FOR INSERT
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can update activities"
ON public.activities
FOR UPDATE
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can delete activities"
ON public.activities
FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

DROP POLICY IF EXISTS "Admins can insert images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can update images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can delete images" ON public.gallery_images;

CREATE POLICY "Admins can insert images"
ON public.gallery_images
FOR INSERT
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can update images"
ON public.gallery_images
FOR UPDATE
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can delete images"
ON public.gallery_images
FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

DROP POLICY IF EXISTS "Only admins can view upload tracking" ON public.upload_tracking;
DROP POLICY IF EXISTS "Only admins can insert upload tracking" ON public.upload_tracking;
DROP POLICY IF EXISTS "Only admins can delete upload tracking" ON public.upload_tracking;
DROP POLICY IF EXISTS "Only admins can update upload tracking" ON public.upload_tracking;

CREATE POLICY "Only admins can view upload tracking"
ON public.upload_tracking
FOR SELECT
TO authenticated
USING (public.is_current_user_admin());

CREATE POLICY "Only admins can insert upload tracking"
ON public.upload_tracking
FOR INSERT
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Only admins can update upload tracking"
ON public.upload_tracking
FOR UPDATE
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Only admins can delete upload tracking"
ON public.upload_tracking
FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

DROP POLICY IF EXISTS "Admins can insert roles securely" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles securely" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles securely" ON public.user_roles;

CREATE POLICY "Admins can insert roles securely"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can update roles securely"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_current_user_admin())
WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can delete roles securely"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_current_user_admin());

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
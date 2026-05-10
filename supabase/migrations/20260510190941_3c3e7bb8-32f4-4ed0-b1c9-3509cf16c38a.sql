CREATE TABLE public.village_images (
  village_name text PRIMARY KEY,
  gallery_image_id uuid REFERENCES public.gallery_images(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.village_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view village images"
  ON public.village_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert village images"
  ON public.village_images FOR INSERT
  TO authenticated
  WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can update village images"
  ON public.village_images FOR UPDATE
  TO authenticated
  USING (public.is_current_user_admin())
  WITH CHECK (public.is_current_user_admin());

CREATE POLICY "Admins can delete village images"
  ON public.village_images FOR DELETE
  TO authenticated
  USING (public.is_current_user_admin());

CREATE TRIGGER village_images_updated_at
  BEFORE UPDATE ON public.village_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
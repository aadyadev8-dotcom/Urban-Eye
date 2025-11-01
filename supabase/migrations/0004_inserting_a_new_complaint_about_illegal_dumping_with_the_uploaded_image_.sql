INSERT INTO public.complaints (
  category,
  description,
  image_url,
  latitude,
  longitude,
  status,
  title,
  user_id
) VALUES (
  'Illegal Dumping',
  'Large piles of construction debris and household waste have been illegally dumped along the roadside near MIHAN area in Nagpur, causing an eyesore and health hazard.',
  '/piles.jpg', -- Using the public URL of the uploaded image
  34.0522, -- Placeholder Latitude (e.g., Los Angeles)
  -118.2437, -- Placeholder Longitude (e.g., Los Angeles)
  'Pending',
  'Illegal Dumping in MIHAN Area',
  auth.uid() -- Automatically links to the currently authenticated user, or NULL if no user is logged in
);
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
  'Broken Streetlights',
  'Several streetlights are out on Main Street near the city park, making the area unsafe at night.',
  '/broken-street-pending.jpg', -- Using the public URL of the uploaded image
  34.0522, -- Placeholder Latitude (e.g., Los Angeles)
  -118.2437, -- Placeholder Longitude (e.g., Los Angeles)
  'Pending',
  'Broken Streetlights on Main Street',
  auth.uid() -- Automatically links to the currently authenticated user, or NULL if no user is logged in
);
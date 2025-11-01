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
  'Water Leakage',
  'Major water pipeline burst causing significant leakage and road damage in Bajaj Nagar, requiring urgent repair.',
  '/pipeline.jpg', -- Using the public URL of the uploaded image
  34.0522, -- Placeholder Latitude (e.g., Los Angeles)
  -118.2437, -- Placeholder Longitude (e.g., Los Angeles)
  'Pending',
  'Water Pipeline Burst in Bajaj Nagar',
  auth.uid() -- Automatically links to the currently authenticated user, or NULL if no user is logged in
);
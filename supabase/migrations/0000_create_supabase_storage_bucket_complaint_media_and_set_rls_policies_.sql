-- Create a new storage bucket for complaint media
INSERT INTO storage.buckets (id, name, public)
VALUES ('complaint-media', 'complaint-media', TRUE)
ON CONFLICT (id) DO NOTHING; -- Only create if it doesn't exist

-- Create a policy to allow authenticated users to upload files to the 'complaint-media' bucket
CREATE POLICY "Allow authenticated uploads to complaint-media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'complaint-media' AND auth.role() = 'authenticated');

-- Create a policy to allow authenticated users to view their own files in the 'complaint-media' bucket
CREATE POLICY "Allow authenticated read access to complaint-media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'complaint-media' AND auth.uid() = owner);

-- Optionally, if you want public read access to uploaded media (e.g., for community feed)
-- CREATE POLICY "Allow public read access to complaint-media"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'complaint-media');
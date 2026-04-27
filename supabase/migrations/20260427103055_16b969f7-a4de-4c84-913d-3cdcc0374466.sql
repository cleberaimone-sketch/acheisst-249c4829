-- Restrict listing: only allow direct object access via URL, not bucket listing
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;

CREATE POLICY "Avatar images are publicly readable"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] IS NOT NULL);
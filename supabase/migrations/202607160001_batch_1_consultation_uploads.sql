-- Batch 1: restore public consultation submissions and enable private uploads.
grant insert on table public.consultation_requests to anon;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'consultation-files',
  'consultation-files',
  false,
  10485760,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Website consultation uploads" on storage.objects;

create policy "Website consultation uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'consultation-files'
  and (storage.foldername(name))[1] ~
    '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
);

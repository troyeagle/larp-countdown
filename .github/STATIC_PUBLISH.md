# Static application publishing

The release branch is `main`. This repository calls the shared
[static publisher](https://github.com/troyeagle/troyeagle.github.io/blob/08201b012b9d4058b6320f649b68ea36a2b9e020/.github/workflows/build-static-app.yml)
at an immutable commit. Both the workflow reference and `publisher_ref` must be
updated together when adopting a new publisher version.

Builds use Node 22, the existing dependency lockfile and application checks.
Trusted release builds upload `site-countdown` with source identity and file hashes;
PR builds have no release artifact or notification credential. The blog verifies
the build before replacing `countdown/`.

For immediate notification, optionally configure `BLOG_DISPATCH_TOKEN` in this
repository. The same fine-grained PAT can be used in all source repositories:
select only `troyeagle.github.io` with **Actions write**, and store its value
separately in each source's Actions Secrets. Do not use the blog Contents-write
token here. Without this secret, periodic/manual collection still works.

See the blog's [maintenance guide](https://github.com/troyeagle/troyeagle.github.io/blob/master/MAINTENANCE.md)
for shared reader permissions, preview, enabling and rollback.

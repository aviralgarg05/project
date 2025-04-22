...existing sections...

## Git Author Identity

Set the correct name/email for **new** commits in this repo:

```bash
cd /Users/aviralgarg/Everything/project
git config user.name "aviralgarg05"
git config user.email "your.email@example.com"
```

### Rewriting Existing Commits

To change the author on past commits, pick N = number of commits to fix:

```bash
git rebase -i HEAD~N
# In the editor, mark each commit as "edit"
```

Then for each stopped commit:

```bash
git commit --amend --author="aviralgarg05 <your.email@example.com>" --no-edit
git rebase --continue
```

After rewriting, force‑push:

```bash
git push --force-with-lease origin main
```

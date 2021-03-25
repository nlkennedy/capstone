git rm -r build;
git rm -r staticfiles;
yarn build;
mv scoring-app/build .;
python3 manage.py collectstatic;
git add build;
git add staticfiles;
@echo off
echo 🏗️ Initializing database schema...

echo 📋 Running schema files...
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/1_auth_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/2_files_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/3_brand_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/4_campaign_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/5_notification_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/6_other_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/7_social_accounts_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/8_chat_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/9_video_postgres_schema.sql
docker exec -i hyf-adwi-postgres psql -U root -d hyf-adwiseli-db -f /docker-entrypoint-initdb.d/11_dashboard_postgres_schema.sql

echo ✅ Schema initialization completed! 
#!/usr/bin/env bash

cat <<EOF > /www/env/env
FLAG_IS_DEMO_STAND='${FLAG_IS_DEMO_STAND}'
FLAG_IS_FUNC='${FLAG_IS_FUNC}'
FLAG_AUTHENTIK_URL='${FLAG_AUTHENTIK_URL}'
FLAG_API_URL='${FLAG_API_URL}'
EOF

cat /www/env/env
# develop exampele: add line FLAG_NAME='${FLAG_NAME}'
# keep " ' " as in the example
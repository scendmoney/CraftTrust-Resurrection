##!/bin/bash
#
#curl -XPOST -s http://ci.dev.architech.nyc/ -H "Content-Type: applicatoin/json" -d '{"user":"'"$GITLAB_USER_NAME"'","channel":"#pipe_im","project":"'"$CI_PROJECT_NAME"'","branch":"'"$CI_COMMIT_REF_NAME"'","status":":heavy_check_mark:","name":"'"$CI_PROJECT_NAME"'","commit":"'"$CI_COMMIT_MESSAGE"'","url":"'"$CI_PIPELINE_URL"'"}'
##curl -XPOST -s http://localhost:5000 -H "Content-Type: applicatoin/json" -d '{"user":"'"$GITLAB_USER_NAME"'","channel":"#pipe_im","project":"'"$CI_PROJECT_NAME"'","branch":"'"$CI_COMMIT_REF_NAME"'","status":":heavy_check_mark:","name":"'"$CI_PROJECT_NAME"'","commit":"'"$CI_COMMIT_MESSAGE"'","url":"'"$CI_PIPELINE_URL"'"}'
#
#echo ""
#
#data='{"user":"'"$GITLAB_USER_NAME"'","channel":"#pipe_im","project":"'"$CI_PROJECT_NAME"'","branch":"'"$CI_COMMIT_REF_NAME"'","status":":heavy_check_mark:","name":"'"$CI_PROJECT_NAME"'","commit":"'"$CI_COMMIT_MESSAGE"'","url":"'"$CI_PIPELINE_URL"'"}'
#echo $data
# 
import requests, sys

channel = sys.argv[1]
status_build = sys.argv[2]
user = sys.argv[3]
name = sys.argv[4]
branch = sys.argv[5]
commit = sys.argv[6]
url = sys.argv[7]

data={
    "channel": channel,
    "status": status_build,
    "user": user,
    "name": name,
    "branch": branch,
    "url": url,
    "commit": commit
  }
print(data)
r = requests.post('http://ci.dev.architech.nyc/', json=data)
r.status_code

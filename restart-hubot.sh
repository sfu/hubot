#!/bin/sh
kill $(ps aux | grep '/var/nodeapps/hubot/node_modules/.bin/hubot' | grep -v grep | awk '{print $2}')

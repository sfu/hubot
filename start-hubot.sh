#!/bin/sh
#
# Simple script to keep hubot running
# This script will restart it if it dies, and log why it died.

source /var/nodeapps/hubot/.hubotrc

while true
do
  if [ -x /var/nodeapps/hubot/bin/hubot ]; then
    cd /var/nodeapps/hubot && bin/hubot -- -a flowdock >> /var/nodeapps/hubot/hubot.log 2>&1
    # We only reach here if hubot dies
    echo "hubot died with error code: $? at `date`" >> /var/nodeapps/hubot/hubot.log
  fi
done

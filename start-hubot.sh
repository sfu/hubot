#!/bin/sh
#
# Simple script to keep hubot running
# This script will restart it if it dies, and log why it died.

source /var/nodeapps/hubot/.hubotrc
forever start --uid 'hubot' -a -l /var/nodeapps/hubot/hubot.log -c coffee node_modules/.bin/hubot -a slack


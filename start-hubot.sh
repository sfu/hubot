#!/bin/sh
#
# Simple script to keep hubot running
# This script will restart it if it dies, and log why it died.

source /home/nodeuser/apps/hubot/.hubotrc
forever start --uid 'hubot' -a -l /home/nodeuser/apps/hubot/hubot.log -c coffee node_modules/.bin/hubot -a slack


'''
<pre>
<code>
pi@korbin:~$ df -h // shows that I have 129G available on my pi

~$: sudo apt update // update the pi
~$: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash _ //did something...though 'failed to run`apt-get-update` 2025.04.14.205024
~$: sudo apt-get install -y nodejs
~$: node -v // to check the version and that it is installed
~$: npm -v // (said not found, wanted do see the installed version of npm)
~$: sudo apt install -y build-essential // (already newest)
~$: sudo apt-get remove nodejs // (no node now)
~$: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash _
~$: sudo apt install npm // (107 MB of additional)
~$: npm -v // (9.2.0)

~$: mkdir Math_Tutor_Notification_App
~$: cd Math_Tutor_Notification_App
~$: npm init -y
~$: npm install express socket.io
~$: nano sever_script.js
~$: mkdir public
~$: node server_script.js
</code>
</pre>
'''

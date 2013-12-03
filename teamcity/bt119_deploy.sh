# 1 - location of the build checkout - double quoted, no trailing slash 
# 2 - relative source path, no trailing slash 
# 3 - relative Key path 
# 4 - target IP 
# 5 - target location 

# building the unix path for the root directory 
dirRoot=$(/usr/bin/cygpath -u $1) 
echo "Unix path for TC working dir is:" $dirRoot 
 
# rsync: 
echo "/usr/bin/rsync -rivh --size-only --no-t --no-p --no-o --no-g --stats --exclude-from=$dirRoot/build/bt119_exclude.txt $dirRoot/src/ -e \"/usr/bin/ssh -i $dirRoot/$3\" root@$4:$5 " 
/usr/bin/rsync -rivh --size-only --no-t --no-p --no-o --no-g --stats --exclude-from=$dirRoot/build/bt119_exclude.txt $dirRoot/src/ -e "/usr/bin/ssh -i $dirRoot/$3" root@$4:$5 
# Setting folder owners and permissions 
echo "/usr/bin/ssh -i $dirRoot/$3 root@$4 \"chown -R apache:apache $5\" " 
/usr/bin/ssh -i $dirRoot/$3 root@$4 "chown -R apache:apache $5" 
echo "/usr/bin/ssh -i $dirRoot/$3 root@$4 \"find $5 -type d -print0 | xargs -0 chmod 0755\" " 
/usr/bin/ssh -i $dirRoot/$3 root@$4 "find $5 -type d -print0 | xargs -0 chmod 0755" 
echo "/usr/bin/ssh -i $dirRoot/$3 root@$4 \"find $5 -type f -print0 | xargs -0 chmod 0644\" " 
/usr/bin/ssh -i $dirRoot/$3 root@$4 "find $5 -type f -print0 | xargs -0 chmod 0644" 

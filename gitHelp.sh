#!/usr/bin/env bash
br=$(git branch | grep "*")
currentBranch=${br/* /}
echo "当前分支:" $currentBranch
git pull origin $currentBranch
if test $? != 0; then
    echo "当前分支pull错误"
    exit 1
fi
read -p "提交信息:" msg
git add .
git commit -am $msg
read -p "需要合到分支:" toBranch
# read -p "确认合到分支:"$toBranch"?(y/n) y " isConfirm
# if test $isConfirm -a $isConfirm = "n"; then
#     exit 0
# fi
git checkout $toBranch
git pull origin $toBranch
git merge $currentBranch
if test $? != 0; then
    echo "qa分支合并有冲突，请解决"
    exit 2
fi
git push origin $toBranch
if test $? != 0; then
    echo "推送异常请解决"
    exit 3
fi
git checkout $currentBranch

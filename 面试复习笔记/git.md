

关联远程仓库` git remote add github https://github.com/liux1118/supermall.git`

第一次上传` git push -u github master`

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

初始化一个Git仓库，使用` git init`

添加文件到Git仓库，` git add .`

给上传的代码添加注释` git commit -m ”message“`

上传，` git push`



查看分支：` git branch`

创建分支：` git branch <name>`

切换分支：` git checkout <name>`

在name2基础上创建name1并切换到分支：` git checkout -b <name1> <name2>`

创建+切换分支：` git checkout -b <name>`

合并某分支到当前分支：` git merge <name>`

删除分支：` git branch -d <name>`

打标签：` git tag <name>`

查看所有标签：` git tag`

- 保存当前未commit的代码
git stash

- 保存当前未commit的代码并添加备注
git stash save "备注的内容"

- 列出stash的所有记录
git stash list

- 删除stash的所有记录
git stash clear

- 应用最近一次的stash
git stash apply

- 应用最近一次的stash，随后删除该记录
git stash pop

- 删除最近的一次stash
git stash drop
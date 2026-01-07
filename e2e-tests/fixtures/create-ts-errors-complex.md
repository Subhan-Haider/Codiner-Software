Tests delete-rename-write order
<codiner-delete path="src/main.tsx">
</codiner-delete>
<codiner-rename from="src/App.tsx" to="src/main.tsx">
</codiner-rename>
<codiner-write path="src/main.tsx" description="final main.tsx file.">
finalMainTsxFileWithError();
</codiner-write>
EOM

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;

namespace CodeStudio
{
    public partial class ReadPath : System.Web.UI.Page
    {
        List<FileTree> list = new List<FileTree>();
        private string[] ignorePaths = new string[] { ".git", ".vscode","bin","obj","Properties" };
        private string[] ignoreFiles = new string[] { ".csproj", ".user", ".sln", ".suo" };
        protected void Page_Load(object sender, EventArgs e)
        {
            string path = @"F:\webfrontend\CodeStudio";
            this.ReadDirectory(path, 1);

            //list = list.OrderBy(c => c.children >= 0 ? "a" : "b" + c.name).ToList();

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(new { path = path, pathtree = list });

            Response.Clear();
            Response.Write(json);
            Response.End();
        }
        private void ReadDirectory(string directory, int level)
        {
            DirectoryInfo di = new DirectoryInfo(directory);
            foreach (var path in di.GetDirectories())
            {
                if (ignorePaths.Contains(path.Name))
                    continue;

                list.Add(new FileTree()
                {
                    name = path.Name,
                    //fullname = path.FullName,
                    parent = path.Parent.Name,
                    level = level,
                    icon = path.GetFiles().Length > 0 ? "directory" : "empty",
                    children = path.GetFiles().Length
                });

                this.ReadDirectory(path.FullName, level + 1);
            }
            foreach (var file in di.GetFiles())
            {
                string ext = file.Extension.TrimStart('.').ToLower();

                if (ignorePaths.Contains(ext))
                    continue;

                list.Add(new FileTree()
                {
                    name = file.Name,
                    //fullname = file.FullName,
                    parent = file.Directory.Name,
                    level = level,
                    icon = ext,
                    children = -1
                });
            }
        }
    }
    public class FileTree
    {
        public string name { get; set; }
        public string fullname { get; set; }
        public string parent { get; set; }
        public int level { get; set; }
        public string icon { get; set; }
        public int children { get; set; }
    }
}
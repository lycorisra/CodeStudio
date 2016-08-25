using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Script.Serialization;

namespace CodeStudio
{
    public partial class ReadPath : System.Web.UI.Page
    {
        List<Document> list = new List<Document>();

        private string path = @"F:\webfrontend\CodeStudio";
        private string[] ignorePaths = new string[] { ".git", ".vs", ".vscode", "bin", "obj", "Properties", "node_modules" };
        private string[] ignoreFiles = new string[] { ".csproj", ".user", ".sln", ".suo", ".gitignore" };

        protected void Page_Load(object sender, EventArgs e)
        {
            var rootPath = new DirectoryInfo(path);
            var root = new Document() {
                name = rootPath.Name,
                icon = "root"
            };
            this.ReadDirectory(path, ref root, 1);
            
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string json = serializer.Serialize(new { path = path, pathtree = root });

            Response.Clear();
            Response.Write(json);
            Response.End();
        }

        private void ReadDirectory(string directory, ref Document root,int level)
        {
            DirectoryInfo di = new DirectoryInfo(directory);
            foreach (var d in di.GetDirectories())
            {
                if (ignorePaths.Contains(d.Name))
                    continue;

                var doc = new Document()
                {
                    name = d.Name,
                    level = level,
                    fullname = d.FullName.Replace(path, ""),
                    icon = "directory",
                    //route = d.GetDirectories()
                };

                this.ReadDirectory(d.FullName, ref doc, level + 1);

                root.children.Add(doc);
            }
            foreach (var file in di.GetFiles())
            {
                string ext = file.Extension;
                if (ignoreFiles.Contains(ext))
                    continue;

                root.children.Add(new Document()
                {
                    name = file.Name,
                    level = level,
                    icon = ext.TrimStart('.').ToLower()
                });
            }
        }

    }
    public class Document
    {
        public string name { get; set; }
        public string fullname { get; set; }
        //public string parent { get; set; }
        public int level { get; set; }
        public string icon { get; set; }
        public List<Document> children { get; set; }
        public string route { get; set; }

        public Document()
        {
            this.children = new List<Document>();
        }

        public List<Document> ReadPath(DirectoryInfo path)
        {
            var list = new List<Document>();
            foreach (var item in path.GetDirectories())
            {
                list.Add(new Document()
                {
                    name = item.Name,
                    //fullname = item.FullName,
                    //parent = item.Parent.Name,
                    level = level,
                    icon = "directory"
                });
            }
            return list;
        }

        public List<Document> ReadFiles(DirectoryInfo path)
        {
            var list = new List<Document>();
            foreach (var file in path.GetFiles())
            {
                string ext = file.Extension.TrimStart('.').ToLower();
                list.Add(new Document()
                {
                    name = file.Name,
                    //fullname = file.FullName,
                    //parent = file.Directory.Name,
                    level = level,
                    icon = ext,
                });
            }
            return list;
        }

        public void AppendChildren(DirectoryInfo path)
        {
            this.children.AddRange(this.ReadPath(path));
            this.children.AddRange(this.ReadFiles(path));
        }
    }
}
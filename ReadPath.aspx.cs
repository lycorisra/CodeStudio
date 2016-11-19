using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace CodeStudio
{
    public partial class ReadPath : System.Web.UI.Page
    {
        List<Document> list = new List<Document>();

        private string path = @"F:\resource\CSS3\图解CSS3核心技术与案例实战源码\code";
        private string[] ignorePaths = new string[] { "font", "images",".git", ".vs", ".vscode", "bin", "obj", "Properties", "node_modules" };
        private string[] ignoreFiles = new string[] { ".DS_Store", ".png", ".jpg", ".gif", ".csproj", ".user", ".sln", ".suo", ".gitignore" };

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
            var list = di.GetDirectories().OrderBy(c => this.ToASCII(c.Name)).ToList();
            foreach (var d in list)
            {
                if (ignorePaths.Contains(d.Name))
                    continue;

                var doc = new Document()
                {
                    name = d.Name,
                    level = level,
                    path = d.FullName.Replace(path, ""),
                    //fullname = d.FullName.Replace(path, ""),
                    icon = "directory",
                    //route = d.GetDirectories()
                };

                this.ReadDirectory(d.FullName, ref doc, level + 1);

                root.children.Add(doc);
            }
            var files = di.GetFiles().ToList();
            files.RemoveAll(c => ignoreFiles.Contains(c.Extension));
            files = files.OrderBy(c => this.ToASCII(c.Name)).ToList();

            foreach (var file in files)
            {
                string ext = file.Extension;
                root.children.Add(new Document()
                {
                    name = file.Name,
                    level = level,
                    icon = ext.TrimStart('.').ToLower()
                });
            }
        }
        private int ToASCII(string text)
        {
            var number = 0;
            var value = Regex.Replace(text, @"[^\d]*", "");
            int.TryParse(value, out number);
            //var encoding = new System.Text.ASCIIEncoding();
            //var bytes = encoding.GetBytes(text);
            //text = string.Join("-", bytes);
            return number;
        }
    }
    public class Document
    {
        public string name { get; set; }
        public string path { get; set; }
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
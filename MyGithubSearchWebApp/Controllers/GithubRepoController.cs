using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MyGithubSearchWebApp.Controllers
{
    public class GithubRepoController : Controller
    {
        public const string GITHUB_REPO_LIST_KEY = "GithubRepoList";
        const string GITHUB_URL_SEARCH_URL = "http://api.github.com/search/repositories";


        public async Task<string> Search([FromUri]string SearchKeyword)
        {
            var result = await GetRequestAsync($"{GITHUB_URL_SEARCH_URL}?q={SearchKeyword}");
            dynamic resultAsJson = JsonConvert.DeserializeObject(result);
            var RepoList = new List<GithubRepo> ();
            foreach (var item in resultAsJson.items)
            {
                RepoList.Add(new GithubRepo()
                {
                    Name = item.name,
                    OwnerAvater = item.owner.avatar_url
                });
            }
            return ToJSJson(RepoList);
        }

        [System.Web.Http.HttpPost]
        public ActionResult Bookmark(GithubRepo GithubRepo)
        {
            if (Session[GITHUB_REPO_LIST_KEY] == null)
            {
                Session[GITHUB_REPO_LIST_KEY] = new List<GithubRepo>();
            }
            var GithubRepoList = Session[GITHUB_REPO_LIST_KEY] as List<GithubRepo>;
            if (GithubRepoList.Any(x => x.Name == GithubRepo.Name))
            {
                return new HttpStatusCodeResult(400, "bookmark already exists");
            }
            else
            {
                GithubRepoList.Add(GithubRepo);
                return new HttpStatusCodeResult(200);
            }
        }

        public string Bookmarks(GithubRepo GithubRepo)
        {
            var GithubRepoList = Session[GITHUB_REPO_LIST_KEY] as List<GithubRepo>;
            return ToJSJson(GithubRepoList);
        }

        private string ToJSJson(dynamic data)
        {
            return JsonConvert.SerializeObject(
                data,
                Formatting.Indented,
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }
            );
        }

        public async Task<string> GetRequestAsync(string uri)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            request.UseDefaultCredentials = true;
            request.UserAgent = "github-repo";

            using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }
        }
    }
}
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Portafolio.Models;

namespace Portafolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var model = new PortfolioViewModel
            {
                Skills = new List<SkillCategory>
                {
                    new SkillCategory
                    {
                        Category = "Backend",
                        Icon = "⚙️",
                        Technologies = new List<string> { ".NET Web API", "C#", "REST APIs", "Entity Framework", "SQL Server" }
                    },
                    new SkillCategory
                    {
                        Category = "Mobile",
                        Icon = "📱",
                        Technologies = new List<string> { "Flutter", "Dart", "Firebase", "Android", "iOS" }
                    },
                    new SkillCategory
                    {
                        Category = "Frontend",
                        Icon = "🎨",
                        Technologies = new List<string> { "HTML5", "CSS3", "JavaScript", "Responsive Design", "ASP.NET MVC" }
                    },
                    new SkillCategory
                    {
                        Category = "Herramientas",
                        Icon = "🛠️",
                        Technologies = new List<string> { "Git", "Visual Studio", "Postman", "VS Code", "Azure" }
                    }
                },
                Projects = new List<Project>
                {
                    new Project
                    {
                        Title = "API REST E-Commerce",
                        Description = "API robusta para gestión de tienda online con autenticación JWT, manejo de inventarios y pagos integrados.",
                        Tech = ".NET Web API · SQL Server · JWT",
                        Tag = "Backend",
                        Year = "2025"
                    },
                    new Project
                    {
                        Title = "App Móvil de Ventas",
                        Description = "Aplicación Flutter multiplataforma para gestión de ventas en campo con sincronización offline y reportes en tiempo real.",
                        Tech = "Flutter · Dart · Firebase",
                        Tag = "Mobile",
                        Year = "2025"
                    },
                    new Project
                    {
                        Title = "Sistema de Gestión UNAN",
                        Description = "Plataforma web para administración académica con módulos de calificaciones, asistencia y comunicación docente-alumno.",
                        Tech = "ASP.NET MVC · Bootstrap · SQL",
                        Tag = "Web",
                        Year = "2026"
                    },
                    new Project
                    {
                        Title = "Dashboard Analytics",
                        Description = "Panel de control con visualización de datos en tiempo real, gráficas interactivas y reportes exportables a PDF.",
                        Tech = "HTML · CSS · JS · Chart.js",
                        Tag = "Frontend",
                        Year = "2026"
                    }
                },
                Experiences = new List<Experience>
                {
                    new Experience
                    {
                        Role = "Estudiante de Ingeniería en Sistemas",
                        Company = "UNAN Managua",
                        Period = "2024 — Presente",
                        Description = "Tercer año de la carrera, especializándome en desarrollo de software, bases de datos y arquitecturas cloud."
                    },
                    new Experience
                    {
                        Role = "Desarrollador Freelance",
                        Company = "Independiente",
                        Period = "2023 — Presente",
                        Description = "Desarrollo de aplicaciones web y móviles para clientes locales, entregando soluciones completas desde el diseño hasta el despliegue."
                    }
                }
            };

            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

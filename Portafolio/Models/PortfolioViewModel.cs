namespace Portafolio.Models
{
    public class PortfolioViewModel
    {
        public string Name { get; set; } = "Juan Karlos Morales Paladino";
        public string Title { get; set; } = "Full Stack Developer";
        public string Description { get; set; } =
            "Desarrollador apasionado por construir soluciones digitales robustas y elegantes. " +
            "Combino lógica de backend con interfaces modernas para crear experiencias que no solo funcionan, " +
            "sino que impresionan. Cada línea de código es una oportunidad para innovar.";
        public string Email { get; set; } = "juankarlos@dev.io";
        public string GitHub { get; set; } = "https://github.com/juankarlos";
        public string LinkedIn { get; set; } = "https://linkedin.com/in/juankarlos";
        public List<SkillCategory> Skills { get; set; } = new();
        public List<Project> Projects { get; set; } = new();
        public List<Experience> Experiences { get; set; } = new();
    }

    public class SkillCategory
    {
        public string Category { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
    }

    public class Project
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Tech { get; set; } = string.Empty;
        public string Tag { get; set; } = string.Empty;
        public string Year { get; set; } = string.Empty;
    }

    public class Experience
    {
        public string Role { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}

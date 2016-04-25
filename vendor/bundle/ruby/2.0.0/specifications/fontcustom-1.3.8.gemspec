# -*- encoding: utf-8 -*-
# stub: fontcustom 1.3.8 ruby lib

Gem::Specification.new do |s|
  s.name = "fontcustom".freeze
  s.version = "1.3.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Kai Zau".freeze, "Joshua Gross".freeze]
  s.date = "2015-02-02"
  s.description = "Font Custom makes using vector icons easy. Generate icon fonts and supporting templates (e.g. @font-face CSS) from a collection of SVGs.".freeze
  s.email = ["kai@kaizau.com".freeze, "joshua@gross.is".freeze]
  s.executables = ["fontcustom".freeze]
  s.files = ["bin/fontcustom".freeze]
  s.homepage = "http://fontcustom.com".freeze
  s.post_install_message = ">> Thanks for installing Font Custom! Please ensure that fontforge is installed before compiling any icons. Visit <http://fontcustom.com> for instructions.".freeze
  s.rubygems_version = "2.6.3".freeze
  s.summary = "Generate icon fonts from the command line.".freeze

  s.installed_by_version = "2.6.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<json>.freeze, ["~> 1.4"])
      s.add_runtime_dependency(%q<thor>.freeze, ["~> 0.14"])
      s.add_runtime_dependency(%q<listen>.freeze, ["< 3.0", ">= 1.0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<bundler>.freeze, [">= 0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.1.0"])
    else
      s.add_dependency(%q<json>.freeze, ["~> 1.4"])
      s.add_dependency(%q<thor>.freeze, ["~> 0.14"])
      s.add_dependency(%q<listen>.freeze, ["< 3.0", ">= 1.0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<bundler>.freeze, [">= 0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.1.0"])
    end
  else
    s.add_dependency(%q<json>.freeze, ["~> 1.4"])
    s.add_dependency(%q<thor>.freeze, ["~> 0.14"])
    s.add_dependency(%q<listen>.freeze, ["< 3.0", ">= 1.0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<bundler>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.1.0"])
  end
end

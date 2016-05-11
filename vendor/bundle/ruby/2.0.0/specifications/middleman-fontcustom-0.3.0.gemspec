# -*- encoding: utf-8 -*-
# stub: middleman-fontcustom 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "middleman-fontcustom".freeze
  s.version = "0.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Yasuaki Uechi".freeze]
  s.date = "2015-06-24"
  s.description = "Generate web-fonts in your Middleman project".freeze
  s.email = ["uetchy@randompaper.co".freeze]
  s.homepage = "https://github.com/uetchy/middleman-fontcustom".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3".freeze)
  s.rubygems_version = "2.6.3".freeze
  s.summary = "Generate web-fonts in your Middleman project".freeze

  s.installed_by_version = "2.6.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<middleman-core>.freeze, [">= 3.3"])
      s.add_runtime_dependency(%q<fontcustom>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    else
      s.add_dependency(%q<middleman-core>.freeze, [">= 3.3"])
      s.add_dependency(%q<fontcustom>.freeze, ["~> 1.3"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<middleman-core>.freeze, [">= 3.3"])
    s.add_dependency(%q<fontcustom>.freeze, ["~> 1.3"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
  end
end
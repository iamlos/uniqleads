# -*- encoding: utf-8 -*-
# stub: hooks 0.4.1 ruby lib

Gem::Specification.new do |s|
  s.name = "hooks".freeze
  s.version = "0.4.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Nick Sutterer".freeze]
  s.date = "2015-08-19"
  s.description = "Declaratively define hooks, add callbacks and run them with the options you like.".freeze
  s.email = ["apotonick@gmail.com".freeze]
  s.homepage = "http://nicksda.apotomo.de/2010/09/hooks-and-callbacks-for-ruby-but-simple/".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.3".freeze
  s.summary = "Generic hooks with callbacks for Ruby.".freeze

  s.installed_by_version = "2.6.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<uber>.freeze, ["~> 0.0.14"])
      s.add_development_dependency(%q<minitest>.freeze, [">= 5.4.1"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
    else
      s.add_dependency(%q<uber>.freeze, ["~> 0.0.14"])
      s.add_dependency(%q<minitest>.freeze, [">= 5.4.1"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<uber>.freeze, ["~> 0.0.14"])
    s.add_dependency(%q<minitest>.freeze, [">= 5.4.1"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
  end
end

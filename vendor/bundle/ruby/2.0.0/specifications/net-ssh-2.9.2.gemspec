# -*- encoding: utf-8 -*-
# stub: net-ssh 2.9.2 ruby lib

Gem::Specification.new do |s|
  s.name = "net-ssh".freeze
  s.version = "2.9.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jamis Buck".freeze, "Delano Mandelbaum".freeze, "Mikl\u{f3}s Fazekas".freeze]
  s.cert_chain = ["-----BEGIN CERTIFICATE-----\nMIIDODCCAiCgAwIBAgIBADANBgkqhkiG9w0BAQUFADBCMRAwDgYDVQQDDAduZXQt\nc3NoMRkwFwYKCZImiZPyLGQBGRYJc29sdXRpb3VzMRMwEQYKCZImiZPyLGQBGRYD\nY29tMB4XDTE0MTIwMjE3MzkyMFoXDTE1MTIwMjE3MzkyMFowQjEQMA4GA1UEAwwH\nbmV0LXNzaDEZMBcGCgmSJomT8ixkARkWCXNvbHV0aW91czETMBEGCgmSJomT8ixk\nARkWA2NvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ0qnw4JV5JN\nMWelqu7pnW2z6GZJ7+zLFYJQNETJyF0U5zo7aCRK08OeUxnpu/TCCXK8iQVkNLfz\n9pVIhF+X8pMEIruAkYGwBt1aWfuSNeyodyMk0vpZdxBHbOTJ4qBRUc6qOtNOeOzv\n8ObYUX52P/EMMaeXTRU+e7MGkB9pb6FvPPNx5akxwIaoRvtcMsc/hJnQuP5r96w6\nt06MgKbXhWAX6gev0RVlrQqzxXst6iuvsrgZGjFqzob5wbTiX9M0+bFAB0EI7tJC\nsv5keEbtNRaU7p3ZbMm4wTHHJLOtD+BpUCSzwv4ToNj9mZtJBMYw2Eeo7z1DklEG\nmr95zbe+zNMCAwEAAaM5MDcwCQYDVR0TBAIwADAdBgNVHQ4EFgQU1bTfpzmitXwv\nLmTXi0IO5vd8NGYwCwYDVR0PBAQDAgSwMA0GCSqGSIb3DQEBBQUAA4IBAQA0Aps8\nUPINGa8XUUtrZtzrgX0/iyXNkKY1ld85g1N3WKEAVLfQI7TlGr0Qv2Ekx6RqlxbR\nVyq08pytSnghW2otR3bIGMGQzqxAeRLb25cjEwH7YIJ32n7ZC1fpMnBZOBDmueWA\nB9EonmoO3ne7AJSgIvBbZzBPhzM4HrQGRW8LsPFsuj+dcJI43HOQwkmv2TRz0+t6\nmGZldmqLcK0abv4JepLfB9XTue3kuyA29NGBibqyvRwlKckLpvKfHZX6Jxad8xxm\nMbvRpzgROzyfw1qYi4dnIyMwTtXFFcZ0a2jpxHPkcTYFK6TzvFgDLAP0Y/u9jqUQ\neZ7/3CdSi/isZHEw\n-----END CERTIFICATE-----\n".freeze]
  s.date = "2015-01-09"
  s.description = "Net::SSH: a pure-Ruby implementation of the SSH2 client protocol. It allows you to write programs that invoke and interact with processes on remote servers, via SSH2.".freeze
  s.email = "net-ssh@solutious.com".freeze
  s.extra_rdoc_files = ["LICENSE.txt".freeze, "README.rdoc".freeze]
  s.files = ["LICENSE.txt".freeze, "README.rdoc".freeze]
  s.homepage = "https://github.com/net-ssh/net-ssh".freeze
  s.licenses = ["MIT".freeze]
  s.rubyforge_project = "net-ssh".freeze
  s.rubygems_version = "2.6.3".freeze
  s.summary = "Net::SSH: a pure-Ruby implementation of the SSH2 client protocol.".freeze

  s.installed_by_version = "2.6.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<test-unit>.freeze, [">= 0"])
      s.add_development_dependency(%q<mocha>.freeze, [">= 0"])
    else
      s.add_dependency(%q<test-unit>.freeze, [">= 0"])
      s.add_dependency(%q<mocha>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<test-unit>.freeze, [">= 0"])
    s.add_dependency(%q<mocha>.freeze, [">= 0"])
  end
end
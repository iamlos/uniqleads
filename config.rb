###
# Page options, layouts, aliases and proxies
###
# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

###
# Plugins
###
#appends -webkit, -moz etc to compiled css
activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 9']
  config.cascade  = false
  config.inline   = false
  config.ignore   = ['shame.css']
end


activate :fontcustom do |fc|
  fc.font_name = 'icons'
  fc.source_dir = 'icons'
  fc.fonts_dir = 'source/assets/fonts'
  fc.css_dir = 'source/assets/stylesheets/generated'
  fc.templates = '_icons.scss _files.scss'
  fc.no_hash = true
  fc.autowidth = false
  fc.preprocessor_path = nil
end

# Time.zone = "UTC"
activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"

  blog.permalink = "{year}/{month}/{day}/{title}.html"
  # Matcher for blog source files
  # blog.sources = "{year}-{month}-{day}-{title}.html"
  # blog.taglink = "tags/{tag}.html"
  # blog.layout = "layout"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"
  blog.layout = "layouts/blog.html.haml"
  blog.tag_template = "blog/tag.html"
  blog.calendar_template = "blog/calendar.html"
  blog.publish_future_dated = true

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page{num}"
end

#pretty urls
activate :directory_indexes

###
# Helpers
###
#activate :asset_hash

activate :s3_sync do |s3_sync|
<<<<<<< HEAD
  s3_sync.bucket                     = 'www.uniqleads.com' # The name of the S3 bucket you are targetting. This is globally unique.
=======
  s3_sync.bucket                     = 'ul-gesa' # The name of the S3 bucket you are targetting. This is globally unique.
>>>>>>> c3042ee4f4f6ead7b2feb3395cee4cb9341b7b7f
  s3_sync.region                     = 'us-east-1'     # The AWS region for your bucket.
  s3_sync.delete                     = true # We delete stray files by default.
  s3_sync.after_build                = false # We do not chain after the build step by default.
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
  s3_sync.prefix                     = ''
  s3_sync.version_bucket             = false
end

caching_policy 'text/html', max_age: 0, must_revalidate: true
caching_policy 'text/xml', max_age: 0, must_revalidate: true

# Reload the browser automatically whenever files change
configure :development do
  # activate :livereload, ignore: ['/assets/']
  activate :livereload

  config[:katoen] = {
    debug: 1
  }

  config[:uniqleads] = {
    environment: 'development',
    dashboardAPI: 'http://localhost:4000/api',
    websiteURL: 'http://localhost:4567'
  }

end

# Build-specific configuration
configure :build do
  config[:katoen] = {
    debug: 0
  }
  config[:uniqleads] = {
     environment: 'production',
<<<<<<< HEAD
     # dashboardAPI: '',
=======
     # dashboardAPI: 'https://',
>>>>>>> c3042ee4f4f6ead7b2feb3395cee4cb9341b7b7f
     websiteURL: 'http://uniqleads.com'
  }
  activate :favicon_maker, :icons => {
    "_favicon_template.png" => [
      { icon: "apple-touch-icon-152x152.png" },             # Same as apple-touch-icon-57x57.png, for retina iPad with iOS7.
      { icon: "apple-touch-icon-144x144.png" },             # Same as apple-touch-icon-57x57.png, for retina iPad with iOS6 or prior.
      { icon: "apple-touch-icon-120x120.png" },             # Same as apple-touch-icon-57x57.png, for retina iPhone with iOS7.
      { icon: "apple-touch-icon-114x114.png" },             # Same as apple-touch-icon-57x57.png, for retina iPhone with iOS6 or prior.
      { icon: "apple-touch-icon-76x76.png" },               # Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS7.
      { icon: "apple-touch-icon-72x72.png" },               # Same as apple-touch-icon-57x57.png, for non-retina iPad with iOS6 or prior.
      { icon: "apple-touch-icon-60x60.png" },               # Same as apple-touch-icon-57x57.png, for non-retina iPhone with iOS7.
      { icon: "apple-touch-icon-57x57.png" },               # iPhone and iPad users can turn web pages into icons on their home screen. Such link appears as a regular iOS native application. When this happens, the device looks for a specific picture. The 57x57 resolution is convenient for non-retina iPhone with iOS6 or prior. Learn more in Apple docs.
      { icon: "apple-touch-icon.png", size: "57x57" },      # Same as apple-touch-icon-57x57.png, for "default" requests, as some devices may look for this specific file. This picture may save some 404 errors in your HTTP logs. See Apple docs
      { icon: "favicon-196x196.png" },                                  # For Android Chrome M31+.
      { icon: "favicon-160x160.png" },                                  # For Opera Speed Dial (up to Opera 12; this icon is deprecated starting from Opera 15), although the optimal icon is not square but rather 256x160. If Opera is a major platform for you, you should create this icon yourself.
      { icon: "favicon-96x96.png" },                                    # For Google TV.
      { icon: "favicon-32x32.png" },                                    # For Safari on Mac OS.
      { icon: "favicon-16x16.png" },                                    # The classic favicon, displayed in the tabs.
      { icon: "favicon.png", size: "16x16" },                           # The classic favicon, displayed in the tabs.
      { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },         # Used by IE, and also by some other browsers if we are not careful.
      { icon: "mstile-70x70.png", size: "70x70" },                      # For Windows 8 / IE11.
      { icon: "mstile-144x144.png", size: "144x144" },
      { icon: "mstile-150x150.png", size: "150x150" },
      { icon: "mstile-310x310.png", size: "310x310" },
      { icon: "mstile-310x150.png", size: "310x150" }
    ]
  }
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  #cache buster
  activate :asset_hash

  #ignore icons assets because it's already compiled
  ignore 'assets/icons/*'
end

["rich", "geo", "start", "more", "force"].each do |name|
  proxy "/signup/#{name}.html", "/signup.html", :locals => { :plan => name }
end

config[:js_dir]     = 'assets/javascripts'
config[:css_dir]    = 'assets/stylesheets'
config[:images_dir] = 'assets/images'
config[:fonts_dir]  = 'assets/fonts'
config[:partials_dir] = 'partials/'
config[:haml] = { :attr_wrapper => '"' }

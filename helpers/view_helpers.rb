module ViewHelpers
	def inline_svg(path, *rest, attributes: {})
		File.open('source/'+(config[:images_dir]+'/'+path).to_s, "rb") do |file|
			file.read
		end
	end
	#either embed svg, or use image tag
	def variable_image(path, *rest, attributes: {})
		if(path[-3..-1] == "svg")
			inline_svg(path, rest, attributes)
		else
			image_tag path, attributes
		end   
	end
	#returns absolute url
	def image_url(path)
		src = capture_haml do
			image_tag(path)
		end
		src.scan(/src="(.+)"/).flatten.first
	end
		
	def haml_tag_if(condition, *args, &block)
		if condition
			haml_tag *args, &block
		else
			yield
		end
	end
	def format_number(no)
		formatted_n = no.to_s.reverse.gsub(/...(?=.)/,'\&,').reverse
	end
	def fully_qualified_url(url)
		config[:uniqleads][:websiteURL] + url
	end
end
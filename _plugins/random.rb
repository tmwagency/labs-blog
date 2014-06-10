module Jekyll
  class RandomNumberTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text.split('-')
    end

    def render(context)
      Random.new.rand(@text[0].to_i..@text[1].to_i)
    end
  end
end

Liquid::Template.register_tag('random', Jekyll::RandomNumberTag)
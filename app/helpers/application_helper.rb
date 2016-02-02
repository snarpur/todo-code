module ApplicationHelper
  def getJs(templateHelper)
    return "\<\%\- #{templateHelper} \%\>".html_safe
  end
end

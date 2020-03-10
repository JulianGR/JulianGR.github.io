---
layout: page
title: About
permalink: /about
---

Some information about you!

### More Information

A place to include any other types of information that you'd like to include about yourself.

### Contact me

[email@domain.com](mailto:email@domain.com)




//TODO
//Codigo en HTML (estamos en un .md)

{% if site.footer-links.email %}<a href="mailto:{{ site.footer-links.email }}"><i class="svg-icon email"></i></a>{% endif %}
{% if site.footer-links.github %}<a href="https://github.com/{{ site.footer-links.github }}"><i class="svg-icon github"></i></a>{% endif %}
{% if site.footer-links.stackoverflow %}<a href="http://stackoverflow.com/{{ site.footer-links.stackoverflow }}"><i class="svg-icon stackoverflow"></i></a>{% endif %}

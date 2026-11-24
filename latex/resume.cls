%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Medium Length Professional CV - RESUME CLASS FILE
%
% This template has been downloaded from:
% http://www.LaTeXTemplates.com
%
% Original header:
% Copyright (C) 2010 by Trey Hunner
%
% Copying and distribution of this file, with or without modification,
% are permitted in any medium without royalty provided the copyright
% notice and this notice are preserved. This file is offered as-is,
% without any warranty.
%
% Created by Trey Hunner and modified by www.LaTeXTemplates.com
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\ProvidesClass{resume}[2010/07/10 v0.9 Resume class]

\LoadClass[11pt,letterpaper]{article} % Font size and paper type

\usepackage[parfill]{parskip} % Remove paragraph indentation
\usepackage{array}            % Required for boldface tabular columns
\usepackage{ifthen}           % Required for ifthenelse statements
\usepackage{enumitem}
\usepackage{fontawesome5}     % Icons: \faPhone, \faEnvelope, \faLinkedin, \faGithub, \faGlobe

% hyperref last — black, no coloured boxes, no borders
\usepackage{hyperref}
\hypersetup{
  colorlinks=false,
  hidelinks
}

\pagestyle{empty} % Suppress page numbers

%----------------------------------------------------------------------------------------
%	HEADINGS COMMANDS
%----------------------------------------------------------------------------------------

\def \name#1{\def\@name{#1}}
\def \@name {}

\def \addressSep {$|$} % separator between contact items

\let \@addressone   \relax
\let \@addresstwo   \relax
\let \@addressthree \relax

\def \address #1{
  \@ifundefined{@addresstwo}{
    \def \@addresstwo {#1}
  }{
  \@ifundefined{@addressthree}{
    \def \@addressthree {#1}
  }{
    \def \@addressone {#1}
  }}
}

\def \printaddress #1{
  \begingroup
    \def \\ {\addressSep\ }
    \centerline{#1}
  \endgroup
  \par
  \addressskip
}

\def \printname {
  \begingroup
    \hfil{\MakeUppercase{\namesize\bf \@name}}\hfil
    \nameskip\break
  \endgroup
}

%----------------------------------------------------------------------------------------
%	PRINT THE HEADING LINES
%----------------------------------------------------------------------------------------

\let\ori@document=\document
\renewcommand{\document}{
  \ori@document
  \printname
  \@ifundefined{@addressone}{}{\printaddress{\@addressone}}
  \@ifundefined{@addresstwo}{}{\printaddress{\@addresstwo}}
  \@ifundefined{@addressthree}{}{\printaddress{\@addressthree}}
}

%----------------------------------------------------------------------------------------
%	SECTION FORMATTING
%----------------------------------------------------------------------------------------

\newenvironment{rSection}[1]{
  \sectionskip
  \MakeUppercase{{\bf #1}}
  \sectionlineskip
  \hrule
  \begin{list}{}{
    \setlength{\leftmargin}{0em}
  }
  \item[]
}{
  \end{list}
}

%----------------------------------------------------------------------------------------
%	WORK EXPERIENCE FORMATTING
%----------------------------------------------------------------------------------------

\newenvironment{rSubsection}[4]{
 {\bf #1} \hfill {#2}
 \ifthenelse{\equal{#3}{}}{}{
  \\
  {\em #3} \hfill {\em #4}
  }\smallskip
  \begin{list}{$\cdot$}{\leftmargin=0em}
   \itemsep -0.5em \vspace{-0.5em}
  }{
  \end{list}
  \vspace{0.5em}
}

%----------------------------------------------------------------------------------------
%	SPACING
%----------------------------------------------------------------------------------------

\def\namesize{\LARGE}
\def\addressskip{\smallskip}
\def\sectionlineskip{\medskip}
\def\nameskip{\medskip}
\def\sectionskip{\medskip}
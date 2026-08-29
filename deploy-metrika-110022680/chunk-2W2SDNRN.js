import{a as be,b as Se,c as Fe}from"./chunk-CADHUO2N.js";import{a as me}from"./chunk-YH2QCRKL.js";import{a as Ie,b as we}from"./chunk-UBH6Z52W.js";import{a as ke,c as Ce,d as O,e as j,f as ve,g as _e,h as ye,j as $,k as Me,l as Oe,n as $e,p as Pe,t as Ee}from"./chunk-ZCTTOUWJ.js";import{d as fe,f as ge,h as xe}from"./chunk-MNEJR3H7.js";import{A as pe,B as de,G as V,J as he,K as A,L as N,N as U,O as R,a as se}from"./chunk-GHTZULAB.js";import{j as ae,l as ue,n as le,p as B}from"./chunk-47STUGFJ.js";import{$b as h,Ab as T,Eb as C,Ha as s,Kb as v,Lb as ie,Ma as f,Mb as ce,O as X,Q as Y,R as P,S as E,Sa as g,Ta as F,Ua as ee,Wa as x,X as I,Xa as y,aa as Z,ac as re,ba as w,ca as S,cb as d,da as J,db as c,fa as m,fb as te,gb as q,hb as M,la as b,mb as r,nb as u,ob as l,pb as L,qa as W,qb as Q,sb as oe,tb as k,ub as z,xb as G,yb as ne,zb as D}from"./chunk-MOM3FHHG.js";var je=({dt:e})=>`
.p-textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: ${e("textarea.color")};
    background: ${e("textarea.background")};
    padding: ${e("textarea.padding.y")} ${e("textarea.padding.x")};
    border: 1px solid ${e("textarea.border.color")};
    transition: background ${e("textarea.transition.duration")}, color ${e("textarea.transition.duration")}, border-color ${e("textarea.transition.duration")}, outline-color ${e("textarea.transition.duration")}, box-shadow ${e("textarea.transition.duration")};
    appearance: none;
    border-radius: ${e("textarea.border.radius")};
    outline-color: transparent;
    box-shadow: ${e("textarea.shadow")};
}

.p-textarea.ng-invalid.ng-dirty {
    border-color: ${e("textarea.invalid.border.color")};
}

.p-textarea:enabled:hover {
    border-color: ${e("textarea.hover.border.color")};
}

.p-textarea:enabled:focus {
    border-color: ${e("textarea.focus.border.color")};
    box-shadow: ${e("textarea.focus.ring.shadow")};
    outline: ${e("textarea.focus.ring.width")} ${e("textarea.focus.ring.style")} ${e("textarea.focus.ring.color")};
    outline-offset: ${e("textarea.focus.ring.offset")};
}

.p-textarea.p-invalid {
    border-color: ${e("textarea.invalid.border.color")};
}

.p-textarea.p-variant-filled {
    background: ${e("textarea.filled.background")};
}

.p-textarea.p-variant-filled:enabled:hover {
    background: ${e("textarea.filled.hover.background")};
}

.p-textarea.p-variant-filled:enabled:focus {
    background: ${e("textarea.filled.focus.background")};
}

.p-textarea:disabled {
    opacity: 1;
    background: ${e("textarea.disabled.background")};
    color: ${e("textarea.disabled.color")};
}

.p-textarea::placeholder {
    color: ${e("textarea.placeholder.color")};
}

.p-textarea.ng-invalid.ng-dirty::placeholder {
    color: ${e("textarea.invalid.placeholder.color")};
}

.p-textarea-fluid {
    width: 100%;
}

.p-textarea-resizable {
    overflow: hidden;
    resize: none;
}

.p-textarea-sm {
    font-size: ${e("textarea.sm.font.size")};
    padding-block: ${e("textarea.sm.padding.y")};
    padding-inline: ${e("textarea.sm.padding.x")};
}

.p-textarea-lg {
    font-size: ${e("textarea.lg.font.size")};
    padding-block: ${e("textarea.lg.padding.y")};
    padding-inline: ${e("textarea.lg.padding.x")};
}
`,He={root:({instance:e,props:i})=>["p-textarea p-component",{"p-filled":e.filled,"p-textarea-resizable ":i.autoResize,"p-invalid":i.invalid,"p-variant-filled":i.variant?i.variant==="filled":e.config.inputStyle==="filled"||e.config.inputVariant==="filled","p-textarea-fluid":i.fluid}]},ze=(()=>{class e extends N{name="textarea";theme=je;classes=He;static \u0275fac=(()=>{let t;return function(o){return(t||(t=m(e)))(o||e)}})();static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})();var De=(()=>{class e extends R{ngModel;control;autoResize;variant;fluid=!1;pSize;onResize=new b;filled;cachedScrollHeight;ngModelSubscription;ngControlSubscription;_componentStyle=I(ze);constructor(t,n){super(),this.ngModel=t,this.control=n}ngOnInit(){super.ngOnInit(),this.ngModel&&(this.ngModelSubscription=this.ngModel.valueChanges.subscribe(()=>{this.updateState()})),this.control&&(this.ngControlSubscription=this.control.valueChanges.subscribe(()=>{this.updateState()}))}get hasFluid(){let n=this.el.nativeElement.closest("p-fluid");return this.fluid||!!n}ngAfterViewInit(){super.ngAfterViewInit(),this.autoResize&&this.resize(),this.updateFilledState(),this.cd.detectChanges()}ngAfterViewChecked(){this.autoResize&&this.resize()}onInput(t){this.updateState()}updateFilledState(){this.filled=this.el.nativeElement.value&&this.el.nativeElement.value.length}resize(t){this.el.nativeElement.style.height="auto",this.el.nativeElement.style.height=this.el.nativeElement.scrollHeight+"px",parseFloat(this.el.nativeElement.style.height)>=parseFloat(this.el.nativeElement.style.maxHeight)?(this.el.nativeElement.style.overflowY="scroll",this.el.nativeElement.style.height=this.el.nativeElement.style.maxHeight):this.el.nativeElement.style.overflow="hidden",this.onResize.emit(t||{})}updateState(){this.updateFilledState(),this.autoResize&&this.resize()}ngOnDestroy(){this.ngModelSubscription&&this.ngModelSubscription.unsubscribe(),this.ngControlSubscription&&this.ngControlSubscription.unsubscribe(),super.ngOnDestroy()}static \u0275fac=function(n){return new(n||e)(f(Me,8),f(j,8))};static \u0275dir=ee({type:e,selectors:[["","pTextarea",""],["","pInputTextarea",""]],hostAttrs:[1,"p-textarea","p-component"],hostVars:16,hostBindings:function(n,o){n&1&&k("input",function(p){return o.onInput(p)}),n&2&&te("p-filled",o.filled)("p-textarea-resizable",o.autoResize)("p-variant-filled",o.variant==="filled"||o.config.inputStyle()==="filled"||o.config.inputVariant()==="filled")("p-textarea-fluid",o.hasFluid)("p-textarea-sm",o.pSize==="small")("p-inputfield-sm",o.pSize==="small")("p-textarea-lg",o.pSize==="large")("p-inputfield-lg",o.pSize==="large")},inputs:{autoResize:[2,"autoResize","autoResize",h],variant:"variant",fluid:[2,"fluid","fluid",h],pSize:"pSize"},outputs:{onResize:"onResize"},features:[v([ze]),x]})}return e})(),Te=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=F({type:e});static \u0275inj=E({})}return e})();var Be=(()=>{class e extends fe{static \u0275fac=(()=>{let t;return function(o){return(t||(t=m(e)))(o||e)}})();static \u0275cmp=g({type:e,selectors:[["MinusIcon"]],features:[x],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(n,o){n&1&&(J(),r(0,"svg",0),l(1,"path",1),u()),n&2&&(M(o.getClassNames()),d("aria-label",o.ariaLabel)("aria-hidden",o.ariaHidden)("role",o.role))},encapsulation:2})}return e})();var Le=["checkboxicon"],Qe=["input"],Ge=()=>({"p-checkbox-input":!0}),Ue=e=>({checked:e,class:"p-checkbox-icon"});function Ke(e,i){if(e&1&&l(0,"span",8),e&2){let t=z(3);c("ngClass",t.checkboxIcon),d("data-pc-section","icon")}}function Xe(e,i){e&1&&l(0,"CheckIcon",9),e&2&&(c("styleClass","p-checkbox-icon"),d("data-pc-section","icon"))}function Ye(e,i){if(e&1&&(L(0),y(1,Ke,1,2,"span",7)(2,Xe,1,2,"CheckIcon",6),Q()),e&2){let t=z(2);s(),c("ngIf",t.checkboxIcon),s(),c("ngIf",!t.checkboxIcon)}}function Ze(e,i){e&1&&l(0,"MinusIcon",9),e&2&&(c("styleClass","p-checkbox-icon"),d("data-pc-section","icon"))}function Je(e,i){if(e&1&&(L(0),y(1,Ye,3,2,"ng-container",4)(2,Ze,1,2,"MinusIcon",6),Q()),e&2){let t=z();s(),c("ngIf",t.checked),s(),c("ngIf",t._indeterminate())}}function We(e,i){}function et(e,i){e&1&&y(0,We,0,0,"ng-template")}var tt=({dt:e})=>`
.p-checkbox {
    position: relative;
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    width: ${e("checkbox.width")};
    height: ${e("checkbox.height")};
}

.p-checkbox-input {
    cursor: pointer;
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: 1;
    outline: 0 none;
    border: 1px solid transparent;
    border-radius: ${e("checkbox.border.radius")};
}

.p-checkbox-box {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${e("checkbox.border.radius")};
    border: 1px solid ${e("checkbox.border.color")};
    background: ${e("checkbox.background")};
    width: ${e("checkbox.width")};
    height: ${e("checkbox.height")};
    transition: background ${e("checkbox.transition.duration")}, color ${e("checkbox.transition.duration")}, border-color ${e("checkbox.transition.duration")}, box-shadow ${e("checkbox.transition.duration")}, outline-color ${e("checkbox.transition.duration")};
    outline-color: transparent;
    box-shadow: ${e("checkbox.shadow")};
}

.p-checkbox-icon {
    transition-duration: ${e("checkbox.transition.duration")};
    color: ${e("checkbox.icon.color")};
    font-size: ${e("checkbox.icon.size")};
    width: ${e("checkbox.icon.size")};
    height: ${e("checkbox.icon.size")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    border-color: ${e("checkbox.hover.border.color")};
}

.p-checkbox-checked .p-checkbox-box {
    border-color: ${e("checkbox.checked.border.color")};
    background: ${e("checkbox.checked.background")};
}

.p-checkbox-checked .p-checkbox-icon {
    color: ${e("checkbox.icon.checked.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${e("checkbox.checked.hover.background")};
    border-color: ${e("checkbox.checked.hover.border.color")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
    color: ${e("checkbox.icon.checked.hover.color")};
}

.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${e("checkbox.focus.border.color")};
    box-shadow: ${e("checkbox.focus.ring.shadow")};
    outline: ${e("checkbox.focus.ring.width")} ${e("checkbox.focus.ring.style")} ${e("checkbox.focus.ring.color")};
    outline-offset: ${e("checkbox.focus.ring.offset")};
}

.p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
    border-color: ${e("checkbox.checked.focus.border.color")};
}

p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
    border-color: ${e("checkbox.invalid.border.color")};
}

.p-checkbox.p-variant-filled .p-checkbox-box {
    background: ${e("checkbox.filled.background")};
}

.p-checkbox-checked.p-variant-filled .p-checkbox-box {
    background: ${e("checkbox.checked.background")};
}

.p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
    background: ${e("checkbox.checked.hover.background")};
}

.p-checkbox.p-disabled {
    opacity: 1;
}

.p-checkbox.p-disabled .p-checkbox-box {
    background: ${e("checkbox.disabled.background")};
    border-color: ${e("checkbox.checked.disabled.border.color")};
}

.p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
    color: ${e("checkbox.icon.disabled.color")};
}

.p-checkbox-sm,
.p-checkbox-sm .p-checkbox-box {
    width: ${e("checkbox.sm.width")};
    height: ${e("checkbox.sm.height")};
}

.p-checkbox-sm .p-checkbox-icon {
    font-size: ${e("checkbox.icon.sm.size")};
    width: ${e("checkbox.icon.sm.size")};
    height: ${e("checkbox.icon.sm.size")};
}

.p-checkbox-lg,
.p-checkbox-lg .p-checkbox-box {
    width: ${e("checkbox.lg.width")};
    height: ${e("checkbox.lg.height")};
}

.p-checkbox-lg .p-checkbox-icon {
    font-size: ${e("checkbox.icon.lg.size")};
    width: ${e("checkbox.icon.lg.size")};
    height: ${e("checkbox.icon.lg.size")};
}
`,ot={root:({instance:e,props:i})=>["p-checkbox p-component",{"p-checkbox-checked":e.checked,"p-disabled":i.disabled,"p-invalid":i.invalid,"p-variant-filled":i.variant?i.variant==="filled":e.config.inputStyle==="filled"||e.config.inputVariant==="filled"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},Ve=(()=>{class e extends N{name="checkbox";theme=tt;classes=ot;static \u0275fac=(()=>{let t;return function(o){return(t||(t=m(e)))(o||e)}})();static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})();var nt={provide:ke,useExisting:Y(()=>H),multi:!0},H=(()=>{class e extends R{value;name;disabled;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;style;inputStyle;styleClass;inputClass;indeterminate=!1;size;formControl;checkboxIcon;readonly;required;autofocus;trueValue=!0;falseValue=!1;variant;onChange=new b;onFocus=new b;onBlur=new b;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.model===this.trueValue:de(this.value,this.model)}get containerClass(){return{"p-checkbox p-component":!0,"p-checkbox-checked p-highlight":this.checked,"p-disabled":this.disabled,"p-variant-filled":this.variant==="filled"||this.config.inputStyle()==="filled"||this.config.inputVariant()==="filled","p-checkbox-sm p-inputfield-sm":this.size==="small","p-checkbox-lg p-inputfield-lg":this.size==="large"}}_indeterminate=W(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;_componentStyle=I(Ve);ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._checkboxIconTemplate=t.template;break;case"checkboxicon":this._checkboxIconTemplate=t.template;break}})}ngOnChanges(t){super.ngOnChanges(t),t.indeterminate&&this._indeterminate.set(t.indeterminate.currentValue)}updateModel(t){let n,o=this.injector.get(j,null,{optional:!0,self:!0}),a=o&&!this.formControl?o.value:this.model;this.binary?(n=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.model=n,this.onModelChange(n)):(this.checked||this._indeterminate()?n=a.filter(p=>!pe(p,this.value)):n=a?[...a,this.value]:[this.value],this.onModelChange(n),this.model=n,this.formControl&&this.formControl.setValue(n)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:n,originalEvent:t})}handleChange(t){this.readonly||this.updateModel(t)}onInputFocus(t){this.focused=!0,this.onFocus.emit(t)}onInputBlur(t){this.focused=!1,this.onBlur.emit(t),this.onModelTouched()}focus(){this.inputViewChild.nativeElement.focus()}writeValue(t){this.model=t,this.cd.markForCheck()}registerOnChange(t){this.onModelChange=t}registerOnTouched(t){this.onModelTouched=t}setDisabledState(t){setTimeout(()=>{this.disabled=t,this.cd.markForCheck()})}static \u0275fac=(()=>{let t;return function(o){return(t||(t=m(e)))(o||e)}})();static \u0275cmp=g({type:e,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(n,o,a){if(n&1&&(G(a,Le,4),G(a,he,4)),n&2){let p;D(p=T())&&(o.checkboxIconTemplate=p.first),D(p=T())&&(o.templates=p)}},viewQuery:function(n,o){if(n&1&&ne(Qe,5),n&2){let a;D(a=T())&&(o.inputViewChild=a.first)}},inputs:{value:"value",name:"name",disabled:[2,"disabled","disabled",h],binary:[2,"binary","binary",h],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",re],inputId:"inputId",style:"style",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",h],size:"size",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",h],required:[2,"required","required",h],autofocus:[2,"autofocus","autofocus",h],trueValue:"trueValue",falseValue:"falseValue",variant:"variant"},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[v([nt,Ve]),x,Z],decls:6,vars:29,consts:[["input",""],[3,"ngClass"],["type","checkbox",3,"focus","blur","change","value","checked","disabled","readonly","ngClass"],[1,"p-checkbox-box"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"styleClass",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"]],template:function(n,o){if(n&1){let a=oe();r(0,"div",1)(1,"input",2,0),k("focus",function(_){return w(a),S(o.onInputFocus(_))})("blur",function(_){return w(a),S(o.onInputBlur(_))})("change",function(_){return w(a),S(o.handleChange(_))}),u(),r(3,"div",3),y(4,Je,3,2,"ng-container",4)(5,et,1,0,null,5),u()()}n&2&&(q(o.style),M(o.styleClass),c("ngClass",o.containerClass),d("data-p-highlight",o.checked)("data-p-checked",o.checked)("data-p-disabled",o.disabled),s(),q(o.inputStyle),M(o.inputClass),c("value",o.value)("checked",o.checked)("disabled",o.disabled)("readonly",o.readonly)("ngClass",ie(26,Ge)),d("id",o.inputId)("name",o.name)("tabindex",o.tabindex)("required",o.required?!0:null)("aria-labelledby",o.ariaLabelledBy)("aria-label",o.ariaLabel),s(3),c("ngIf",!o.checkboxIconTemplate&&!o._checkboxIconTemplate),s(),c("ngTemplateOutlet",o.checkboxIconTemplate||o._checkboxIconTemplate)("ngTemplateOutletContext",ce(27,Ue,o.checked)))},dependencies:[B,ae,ue,le,be,Be,A],encapsulation:2,changeDetection:0})}return e})(),Ae=(()=>{class e{static \u0275fac=function(n){return new(n||e)};static \u0275mod=F({type:e});static \u0275inj=E({imports:[H,A,A]})}return e})();var Ne=class e{constructor(i,t,n){this.messageService=i;this.http=t;this.metrika=n}contactEndpoint=U.contactEndpoint??`${U.apiUrl}/contact`;phonePattern="^[0-9+() -]+$";contactForm=new ye({name:new $("",[O.required]),phone:new $("",[O.required,O.pattern(this.phonePattern)]),message:new $(""),consent:new $(!1,[O.requiredTrue])});submitForm(){if(this.contactForm.valid){let{name:i,phone:t,message:n}=this.contactForm.value,o={name:i,phone:t,message:n};this.http.post(this.contactEndpoint,o).pipe(X(()=>this.contactForm.reset({consent:!1}))).subscribe({next:()=>{this.metrika.reachGoal("contact_form_success"),this.messageService.add({severity:"success",summary:"\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430",detail:"\u041C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0432\u0430\u0448\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0438 \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F.",life:4e3})},error:()=>{this.messageService.add({severity:"error",summary:"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",detail:"\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",life:4e3})}})}}static \u0275fac=function(t){return new(t||e)(f(V),f(se),f(me))};static \u0275cmp=g({type:e,selectors:[["app-contactform"]],features:[v([V])],decls:21,vars:3,consts:[["id","contactform",1,"contact-form-section"],[3,"ngSubmit","formGroup"],[1,"form-group"],["type","text","pInputText","","placeholder","\u0412\u0430\u0448\u0435 \u0438\u043C\u044F","formControlName","name"],["type","tel","pInputText","","placeholder","\u0422\u0435\u043B\u0435\u0444\u043E\u043D","formControlName","phone","inputmode","tel"],["pInputTextarea","","rows","4","placeholder","\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)","formControlName","message"],[1,"form-group","consent"],["formControlName","consent","binary","true","inputId","consent"],["for","consent"],["routerLink","/policy","target","_blank"],["pButton","","type","submit","label","\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",3,"disabled"]],template:function(t,n){t&1&&(l(0,"p-toast"),r(1,"section",0)(2,"h2"),C(3,"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443"),u(),r(4,"p"),C(5,"\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0438 \u043A\u0440\u0430\u0442\u043A\u043E \u043E\u043F\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432 \u0440\u0430\u0431\u043E\u0447\u0435\u0435 \u0432\u0440\u0435\u043C\u044F."),u(),r(6,"form",1),k("ngSubmit",function(){return n.submitForm()}),r(7,"div",2),l(8,"input",3),u(),r(9,"div",2),l(10,"input",4),u(),r(11,"div",2),l(12,"textarea",5),u(),r(13,"div",6),l(14,"p-checkbox",7),r(15,"label",8),C(16," \u042F \u0434\u0430\u044E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043C\u043E\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 (\u0438\u043C\u044F, \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F) \u0432 \u0446\u0435\u043B\u044F\u0445 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u0438 \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430 \u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0441 "),r(17,"a",9),C(18," \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 "),u(),C(19,". "),u()(),l(20,"button",10),u()()),t&2&&(s(6),c("formGroup",n.contactForm),s(4),d("pattern",n.phonePattern),s(10),c("disabled",!n.contactForm.valid))},dependencies:[B,Ee,Oe,Ce,ve,_e,$e,Pe,we,Ie,Te,De,xe,ge,Fe,Se,Ae,H],styles:["[_nghost-%COMP%]{display:block}.contact-form-section[_ngcontent-%COMP%]{background-color:#f6f6f6;padding:3rem 2rem;text-align:center}.contact-form-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2rem;font-weight:700;margin-bottom:.5rem;color:#4f4732;font-family:Roboto,sans-serif}.contact-form-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:2rem;color:#4f4732;font-family:Roboto,sans-serif}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{max-width:600px;margin:0 auto}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-bottom:1.5rem}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%;padding:.75rem;border:1px solid #cccccc;border-radius:6px;font-family:Roboto,sans-serif}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{outline:none;border-color:#4f4732;box-shadow:0 0 0 2px #3490dc33}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:hover{border-color:#4f4732}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.75rem;font-size:.9rem;color:#555;text-align:left}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox{display:inline-flex;align-items:center;justify-content:center}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox-box{width:20px;height:20px;border-radius:6px;border:2px solid #4f4732;background:#fff;transition:all .15s ease}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-highlight .p-checkbox-box, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-checkbox-checked .p-checkbox-box{background:#4f4732;border-color:#4f4732}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-highlight .p-checkbox-icon, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-checkbox-checked .p-checkbox-icon, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-highlight .p-checkbox-box .p-icon, .contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]     .p-checkbox.p-checkbox-checked .p-checkbox-box .p-icon{color:#fff;font-size:12px;width:12px;height:12px;display:inline-flex;align-items:center;justify-content:center}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#4f4732;text-decoration:underline}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .consent[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{opacity:.8}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]     button.p-button{width:100%;background-color:#4f4732;border:none;color:#fff;font-weight:600;transition:opacity .25s}.contact-form-section[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]     button.p-button:hover{opacity:.9}"]})};export{Ne as a};

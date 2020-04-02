import Component from './Component'

class ComponentList {
    [key: string]: Component

    /**
     * 
     * @param component     추가할 컴포넌트 인스턴스입니다.
     * @description         컴포넌트 인스턴스를 리스트에 추가합니다.
     */
    static add(componentList: ComponentList, component: Component): void {
        if (!(componentList instanceof ComponentList))
            throw 'The first parameter must be a ComponentList instance.'
        if (!(component instanceof Component))
            throw 'The second parameter must be a Component instance.'
        componentList[component.name] = component
    }
}

export default ComponentList
import View from '@/View/View'
import Component from '@/View/Component'
import ArrayExtra from '@/Utils/ArrayExtra'

class Searcher {
    /**
     * 
     * @param view      검색할 View 인스턴스입니다.
     * @param parent    대상 View 인스턴스입니다.
     * @param deep      깊은 탐색을 할지를 여부를 지정합니다.
     * @description     view 객체가 parent 객체의 하위에 존재하는지 여부를 검색하여 반환합니다.
     */
    static isChildren(view: View, parent: View, deep: boolean = false): boolean {
        const children: Component = parent.component.children

        // Reservation.Children 컴포넌트가 존재하지 않을 경우 거짓을 반환합니다.
        if (!children)
            return false

        // 하위에 객체가 존재할 경우, 즉시 참을 반환합니다.
        const has = ArrayExtra.has(children.lists, view)
        if (has)
            return true

        // 하위에 객체가 존재하지 않으면서, 깊은 탐색을 하지 않을 경우 거짓을 반환합니다.
        else if (!deep)
            return false

        // 여기서부터는 깊은 탐색을 시작합니다.
        // children.lists 배열을 순회하며, 재귀호출을 함으로서 탐색을 진행합니다.
        let found: boolean = false
        for (const next of children.lists) {
            if (found)
                break
            else
                found = Searcher.isChildren(view, next, true)
        }
        return found
    }

    /**
     * 
     * @param v         검색할 HTMLElement 인스턴스입니다.
     * @description     검색할 인스턴스의 부모 HTMLElement 를 검색하여 반환합니다.
     */
    static getParentElementFromChildren(v: HTMLElement | null): HTMLElement | null {
        const bodyClassName: string = 'we-body'
        if (!(v instanceof HTMLElement))
            return null
        do
            v = v.parentElement
        while (v && !v.classList.contains(bodyClassName))
        return v
    }
}

export default Searcher
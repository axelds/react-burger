import { useState, useMemo, useRef, useEffect } from 'react';
import { useOnInView } from "react-intersection-observer";
import { useSelector } from '../../hooks/useRedux';
import { Ingredient } from '../../utils/types';
import { Ingredient as IngredientType } from '../../utils/types';
import IngredientCard from '../IngredientCard/IngredientCard';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './BurgerIngredients.module.scss';

const BurgerIngredients = () => {

    const ingredients = useSelector((state) => state.ingredients.items as IngredientType[])
    const constructorIngredients = useSelector(
        (state) => state.burgerConstructor.fillings
    )

    const [current, setCurrent] = useState<string>('bun')
    const [isLoading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const breadRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)
    const fillingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setLoading(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container || isLoading) return

        const observerOptions = {
            root: container,
            rootMargin: '0px 0px -90% 0px',
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section')
                    if (sectionId) {
                        setCurrent(sectionId)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        )

        if (breadRef.current) observer.observe(breadRef.current)
        if (sauceRef.current) observer.observe(sauceRef.current)
        if (fillingRef.current) observer.observe(fillingRef.current)

        return () => observer.disconnect()
    }, [isLoading])
    
    const categorizedIngredients = useMemo(
        () => ({
            bun: ingredients.filter(
                (item: Ingredient) => item.type === 'bun'
            ) as Ingredient[],
            sauce: ingredients.filter(
                (item: Ingredient) => item.type === 'sauce'
            ) as Ingredient[],
            main: ingredients.filter(
                (item: Ingredient) => item.type === 'main'
            ) as Ingredient[],
        }),
        [ingredients]
    )

    const getIngredientCount = (ingredient: Ingredient): number => {
        return ingredient.type === 'bun'
            ? constructorIngredients.filter(
                  (item) => item._id === ingredient._id
              ).length * 2
            : constructorIngredients.filter(
                  (item) => item._id === ingredient._id
              ).length
    }

    const handleScroll = (theme: 'bun' | 'sauce' | 'main') => {
        if (theme === 'bun') {
            if (breadRef.current) {
                breadRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrent('bun')
            }
        } else if (theme === 'sauce') {
            if (sauceRef.current) {
                sauceRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrent('sauce')
            }
        } else {
            if (fillingRef.current) {
                fillingRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrent('main')
            }
        }
    }

    const breadTrackingRef = useOnInView(
        (inView) => {
            if (inView) {
                setCurrent('bun')
            }
        }
    );

    const sauceTrackingRef = useOnInView(
        (inView) => {
            if (inView) {
                setCurrent('sauce')
            }
        }
    );

    const fillingTrackingRef = useOnInView(
        (inView) => {
            if (inView) {
                setCurrent('main')
            }
        }
    );
    
    return (
        <section className="pt-10">
                <>
                    <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
                    <div className={`${Styles.flex} pb-10`}>
                        <Tab value="bun" active={current === 'bun'} onClick={() => handleScroll('bun')}>
                            Булки
                        </Tab>
                        <Tab value="sauce" active={current === 'sauce'} onClick={() => handleScroll('sauce')}>
                            Соусы
                        </Tab>
                        <Tab value="main" active={current === 'main'} onClick={() => handleScroll('main')}>
                            Начинки
                        </Tab>
                    </div>

                    <div className={Styles.product_list} ref={containerRef}>
                        <div className={Styles.section} ref={breadTrackingRef}>
                            <h2 className="text text_type_main-medium mb-5" ref={breadRef} data-section="bun">Булки</h2>
                            <div className={`${Styles.ingredientsList} mt-10`}>
                                {categorizedIngredients.bun.map(
                                    (ingredient) => (
                                        <IngredientCard
                                            key={ingredient._id}
                                            ingredient={ingredient}
                                            onClick={() => {}}
                                            getIngredientCount={getIngredientCount}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className={Styles.section} ref={sauceTrackingRef}>
                            <h2 className="text text_type_main-medium mb-5 mt-10" ref={sauceRef} data-section="sauce">Соусы</h2>
                            <div className={`${Styles.ingredientsList} mt-10`}>
                                {categorizedIngredients.sauce.map(
                                    (ingredient) => (
                                        <IngredientCard
                                            key={ingredient._id}
                                            ingredient={ingredient}
                                            onClick={() => {}}
                                            getIngredientCount={getIngredientCount}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                        <div className={Styles.section} ref={fillingTrackingRef}>
                            <h2 className="text text_type_main-medium mb-5 mt-10" ref={fillingRef} data-section="main">Начинки</h2>
                            <div className={`${Styles.ingredientsList} mt-10`}>
                                {categorizedIngredients.main.map(
                                    (ingredient) => (
                                        <IngredientCard
                                            key={ingredient._id}
                                            ingredient={ingredient}
                                            onClick={() => {}}
                                            getIngredientCount={getIngredientCount}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </>
        </section>
    );
}

export default BurgerIngredients;


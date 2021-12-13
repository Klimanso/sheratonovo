import Head from 'next/head'
import Image from 'next/image'
import sbmaxx from '../public/images/sbmaxx.jpg'
import xxxxxx from '../public/images/xxxxxx.jpg'
import fzvolinsky from '../public/images/fzvolinsky.jpg'
import klimanso from '../public/images/klimanso.jpg'
import stLukas from '../public/images/st-lukas.jpg'

import styles from '../styles/Home.module.css'

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt();

import { promises as fs } from 'fs'
import path from 'path'

import { format, add } from 'date-fns'

export async function getStaticProps() {
    const dataDirectory = path.join(process.cwd(), 'data')
    const filenames = await fs.readdir(dataDirectory)

    const data = filenames.map(async (filename) => {
        const filePath = path.join(dataDirectory, filename)
        const fileContents = await fs.readFile(filePath, 'utf8')

        return {
            filename,
            content: md.render(fileContents),
        }
    })

    return {
        props: {
            data: await (await Promise.all(data)).reduce((acc, v) => {
                acc[v.filename.replace('.md', '')] = v.content
                return acc;
            }, {}),
        },
    }
}


export default function Home({ data }) {

    const schedule = [
        {
            title: 'трансфер от КР',
            where: 'напротив Экстрополиса',
            startDate: new Date('December 15, 2021 09:00:00'),
            duration: {
                hours: 2
            }
        },
        {
            title: 'приветственный кофе-брэйк',
            where: 'конгресс-холл',
            duration: {
                minutes: 20
            },
        },
        {
            title: 'вводное слово',
            where: 'зал «Лебединое озеро»',
            duration: {
                minutes: 10
            },
            author: {
                name: 'Роман Рождественский',
                image: sbmaxx
            }
        },
        {
            title: 'DevUX',
            where: 'зал «Лебединое озеро»',
            duration: {
                minutes: 90
            },
            author: {
                name: 'Артём Семёнов',
                image: xxxxxx
            },
            content: data.devux
        },
        {
            title: 'биопауза',
            where: 'конгресс-холл',
            duration: {
                minutes: 10
            }
        },
        {
            title: 'SPAS: как сделать пользователям красиво, а разработчикам удобно',
            where: 'зал «Лебединое озеро»',
            duration: {
                minutes: 90
            },
            author: {
                name: 'Александр Сулима',
                image: stLukas
            },
            content: data.spas
        },
        {
            title: 'обед',
            where: 'ресторан «Эмеральд»',
            duration: {
                minutes: 50
            }
        },
        {
            title: 'Разработка и Тестирование = ❤️',
            where: 'зал «Лебединое озеро»',
            duration: {
                minutes: 80
            },
            author: {
                name: 'Фёдор Зволинский',
                image: fzvolinsky
            },
            content: data.quality
        },
        {
            title: 'кофе-брэйк',
            where: 'конгресс-холл',
            duration: {
                minutes: 20
            }
        },
        {
            title: 'производство',
            where: 'зал «Лебединое озеро»',
            duration: {
                minutes: 80
            },
            author: {
                name: 'Герай Суинов',
                image: klimanso
            },
            content: data.ct
        },
        {
            title: 'свободное время+заселение',
            duration: {
                minutes: 45
            }
        },
        {
            title: 'банкет + разговоры про ревью',
            where: 'бар «Библиотека»',
            duration: {
                hours: 1,
                minutes: 45
            }
        },
        {
            startDate: new Date('December 15, 2021 21:00:00'),
            title: '«Матрица»',
            where: 'кинотеатр',
            duration: {
                hours: 3
            }
        },
        {
            startDate: new Date('December 15, 2021 21:00:00'),
            title: 'Бильярд',
            where: 'бильярдная комната',
            duration: {
                hours: 3
            }
        },
        {
            startDate: new Date('December 16, 2021 09:00:00'),
            title: 'завтрак',
            duration: {
                hours: 1
            }
        },
        {
            title: 'Трансфер в КР',
            duration: {
                hours: 2
            }
        }
    ];

    schedule.forEach((s, i, a) => {
        const startDate = s.startDate ? s.startDate : (a[i - 1]).endDate;
        const endDate = add(startDate, s.duration);

        s.startDate = startDate;
        s.endDate = endDate;

        return s;
    });


    return (
        <div className={styles.container}>
            <Head>
                <title>Шератоново</title>
                <meta name="description" content="Шератново. Поисковые интерфейсы" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#000000" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Добро пожаловать в Шератоново!
                </h1>

                <div className={styles.schedule}>
                    {schedule.map(s => {
                        return (
                            <div className={styles.scheduleSection}>
                                <div className={styles.scheduleTime}>
                                    {format(s.startDate, 'HH:mm')} — {format(s.endDate, 'HH:mm')}
                                </div>
                                <div className={styles.scheduleContainer}>
                                    <h2 className={styles.scheduleTitle}>{s.title}</h2>
                                    <p className={styles.scheduleWhere}>{s.where}</p>
                                    <div className={styles.scheduleContent} dangerouslySetInnerHTML={{ __html: s.content }} />

                                    <div className={styles.scheduleMeta}>
                                        {s.author && <>
                                            <Image src={s.author.image} width="48" height="48" className={styles.avatar} />
                                            <p>{s.author.name}</p>
                                        </>}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <footer className={styles.footer}></footer>
        </div>
    )
}

export type certificateType = {
    title: string
    description: string
    completion_date: string
    provider: string
    tags: string[]
    verify_link: string
}

export type projectType = {
    title: string
    description: string
    screenshots: string[]
    status: string
    link: string
    tags: string[]
}

export type experienceType = {
    title: string
    description: string
    company: string
    technologies_used: string[]
    duration: string
    link: string
}
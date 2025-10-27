export default defineAppConfig({
  ui: {
    input: {
      slots: {
        root: "relative inline-flex items-center",
        base: [
          "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        leading: "absolute inset-y-0 start-0 flex items-center",
        leadingIcon: "shrink-0 text-dimmed",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailing: "absolute inset-y-0 end-0 flex items-center",
        trailingIcon: "shrink-0 text-dimmed",
      },
      variants: {
        fieldGroup: {
          horizontal: {
            root: "group has-focus-visible:z-[1]",
            base: "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none",
          },
          vertical: {
            root: "group has-focus-visible:z-[1]",
            base: "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none",
          },
        },
        size: {
          xs: {
            base: "px-2 py-1 text-xs gap-1",
            leading: "ps-2",
            trailing: "pe-2",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
          },
          sm: {
            base: "px-4 py-2 text-xs gap-2",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
          },
          md: {
            base: "px-2.5 py-1.5 text-sm gap-1.5",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          lg: {
            base: "px-3 py-2 text-sm gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          xl: {
            base: "px-3 py-2 text-base gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-6",
            leadingAvatarSize: "xs",
            trailingIcon: "size-6",
          },
        },
        variant: {
          outline: "text-highlighted bg-default ring ring-inset ring-accented",
          soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
          subtle: "text-highlighted bg-elevated ring ring-inset ring-accented",
          ghost: "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
          none: "text-highlighted bg-transparent",
        },
        color: {
          primary: "",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "",
        },
        leading: {
          true: "",
        },
        trailing: {
          true: "",
        },
        loading: {
          true: "",
        },
        highlight: {
          true: "",
        },
        type: {
          file: "file:me-1.5 file:font-medium file:text-muted file:outline-none",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: [
            "outline",
            "subtle",
          ],
          class: "focus-visible:outline focus-visible:outline-primary-main",
        },
        {
          color: "primary",
          highlight: true,
          class: "outline outline-primary-main",
        },
        {
          color: "neutral",
          variant: [
            "outline",
            "subtle",
          ],
          class: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted border border-primary-main",
        },
        {
          color: "neutral",
          highlight: true,
          class: "ring ring-inset ring-inverted",
        },
        {
          leading: true,
          size: "xs",
          class: "ps-7",
        },
        {
          leading: true,
          size: "sm",
          class: "ps-8",
        },
        {
          leading: true,
          size: "md",
          class: "ps-9",
        },
        {
          leading: true,
          size: "lg",
          class: "ps-10",
        },
        {
          leading: true,
          size: "xl",
          class: "ps-11",
        },
        {
          trailing: true,
          size: "xs",
          class: "pe-7",
        },
        {
          trailing: true,
          size: "sm",
          class: "pe-8",
        },
        {
          trailing: true,
          size: "md",
          class: "pe-9",
        },
        {
          trailing: true,
          size: "lg",
          class: "pe-10",
        },
        {
          trailing: true,
          size: "xl",
          class: "pe-11",
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: "animate-spin",
          },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: "animate-spin",
          },
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
    modal: {
      slots: {
        overlay: "fixed inset-0 bg-netral-100/75",
        content: "fixed bg-default divide-y divide-default flex flex-col focus:outline-none",
        header: "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
        wrapper: "",
        body: "flex-1 overflow-y-auto p-4 sm:p-6",
        footer: "flex items-center gap-1.5 p-4 sm:px-6 justify-end",
        title: "text-netral-100 font-semibold",
        description: "mt-1 text-muted text-sm",
        close: "absolute top-4 end-4",
      },
      variants: {
        transition: {
          true: {
            overlay: "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
            content: "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]",
          },
        },
        fullscreen: {
          true: {
            content: "inset-0",
          },
          false: {
            content: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-5xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default overflow-hidden",
          },
        },
      },
    },
    select: {
      slots: {
        base: [
          "relative group h-10 w-full py-2 px-4 rounded-md inline-flex items-center focus:outline-primary-main disabled:cursor-not-allowed disabled:opacity-75",
          "transition-colors",
        ],
        leading: "absolute inset-y-0 start-0 flex items-center",
        leadingIcon: "shrink-0 text-dimmed",
        leadingAvatar: "shrink-0",
        leadingAvatarSize: "",
        trailing: "absolute inset-y-0 end-0 flex items-center",
        trailingIcon: "shrink-0 text-dimmed",
        value: "truncate pointer-events-none",
        placeholder: "truncate text-dimmed",
        arrow: "fill-default",
        content: "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
        viewport: "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
        group: "p-1 isolate",
        empty: "text-center text-muted",
        label: "font-semibold text-highlighted",
        separator: "-mx-1 my-1 h-px bg-border",
        item: [
          "group relative font-semibold w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-netral-90 data-highlighted:not-data-disabled:text-primary-main data-highlighted:not-data-disabled:before:bg-primary-surface",
          "transition-colors before:transition-colors",
        ],
        itemLeadingIcon: [
          "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          "transition-colors",
        ],
        itemLeadingAvatar: "shrink-0",
        itemLeadingAvatarSize: "",
        itemLeadingChip: "shrink-0",
        itemLeadingChipSize: "",
        itemTrailing: "ms-auto inline-flex gap-1.5 items-center",
        itemTrailingIcon: "shrink-0",
        itemWrapper: "flex-1 flex flex-col min-w-0",
        itemLabel: "truncate",
        itemDescription: "truncate text-muted",
      },
      variants: {
        fieldGroup: {
          horizontal: "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
          vertical: "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]",
        },
        size: {
          xs: {
            base: "px-2 py-1 text-xs gap-1",
            leading: "ps-2",
            trailing: "pe-2",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
            label: "p-1 text-[10px]/3 gap-1",
            item: "p-1 text-xs gap-1",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-1 text-xs",
          },
          sm: {
            base: "px-2.5 py-1.5 text-xs gap-1.5",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-4",
            leadingAvatarSize: "3xs",
            trailingIcon: "size-4",
            label: "p-1.5 text-[10px]/3 gap-1.5",
            item: "p-1.5 text-xs gap-1.5",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-1.5 text-xs",
          },
          md: {
            base: "px-2.5 py-1.5 text-sm gap-1.5",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
            label: "p-1.5 text-xs gap-1.5",
            item: "p-1.5 text-sm gap-1.5",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-1.5 text-sm",
          },
          lg: {
            base: "px-3 py-2 text-sm gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
            label: "p-2 text-xs gap-2",
            item: "p-2 text-sm gap-2",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-2 text-sm",
          },
          xl: {
            base: "px-3 py-2 text-base gap-2",
            leading: "ps-3",
            trailing: "pe-3",
            leadingIcon: "size-6",
            leadingAvatarSize: "xs",
            trailingIcon: "size-6",
            label: "p-2 text-sm gap-2",
            item: "p-2 text-base gap-2",
            itemLeadingIcon: "size-6",
            itemLeadingAvatarSize: "xs",
            itemLeadingChip: "size-6",
            itemLeadingChipSize: "lg",
            itemTrailingIcon: "size-6",
            empty: "p-2 text-base",
          },
        },
        variant: {
          outline: "text-netral-90 bg-white outline outline-netral-40",
          soft: "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
          subtle: "text-highlighted bg-elevated outline outline-netral-40",
          ghost: "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
          none: "text-highlighted bg-transparent",
        },
        color: {
          primary: "",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "",
        },
        leading: {
          true: "",
        },
        trailing: {
          true: "",
        },
        loading: {
          true: "",
        },
        highlight: {
          true: "",
        },
        type: {
          file: "file:me-1.5 file:font-medium file:text-muted file:outline-none",
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: [
            "outline",
            "subtle",
          ],
          class: "focus:outline focus:outline-primary-main",
        },
        {
          color: "primary",
          highlight: true,
          class: "outline outline-primary-main",
        },
        {
          color: "neutral",
          variant: [
            "outline",
            "subtle",
          ],
          class: "focus:ring-2 focus:ring-inset focus:ring-inverted",
        },
        {
          color: "neutral",
          highlight: true,
          class: "ring ring-inset ring-inverted",
        },
        {
          leading: true,
          size: "xs",
          class: "ps-7",
        },
        {
          leading: true,
          size: "sm",
          class: "ps-8",
        },
        {
          leading: true,
          size: "md",
          class: "ps-9",
        },
        {
          leading: true,
          size: "lg",
          class: "ps-10",
        },
        {
          leading: true,
          size: "xl",
          class: "ps-11",
        },
        {
          trailing: true,
          size: "xs",
          class: "pe-7",
        },
        {
          trailing: true,
          size: "sm",
          class: "pe-8",
        },
        {
          trailing: true,
          size: "md",
          class: "pe-9",
        },
        {
          trailing: true,
          size: "lg",
          class: "pe-10",
        },
        {
          trailing: true,
          size: "xl",
          class: "pe-11",
        },
        {
          loading: true,
          leading: true,
          class: {
            leadingIcon: "animate-spin",
          },
        },
        {
          loading: true,
          leading: false,
          trailing: true,
          class: {
            trailingIcon: "animate-spin",
          },
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "outline",
      },
    },
    calendar: {
      slots: {
        root: "",
        header: "flex items-center justify-between",
        body: "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
        heading: "text-center font-medium truncate mx-auto",
        grid: "w-full border-collapse select-none space-y-1 focus:outline-none",
        gridRow: "grid grid-cols-7 place-items-center",
        gridWeekDaysRow: "mb-1 grid w-full grid-cols-7",
        gridBody: "grid",
        headCell: "rounded-md",
        cell: "relative text-center",
        cellTrigger: [
          "m-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-today:font-semibold data-[outside-view]:text-muted",
          "transition",
        ],
      },
      variants: {
        color: {
          primary: {
            headCell: "text-primary",
            cellTrigger: "focus-visible:ring-primary",
          },
          secondary: {
            headCell: "text-secondary",
            cellTrigger: "focus-visible:ring-secondary",
          },
          success: {
            headCell: "text-success",
            cellTrigger: "focus-visible:ring-success",
          },
          info: {
            headCell: "text-info",
            cellTrigger: "focus-visible:ring-info",
          },
          warning: {
            headCell: "text-warning",
            cellTrigger: "focus-visible:ring-warning",
          },
          error: {
            headCell: "text-error",
            cellTrigger: "focus-visible:ring-error",
          },
          neutral: {
            headCell: "text-highlighted",
            cellTrigger: "focus-visible:ring-inverted",
          },
        },
        variant: {
          solid: "",
          outline: "",
          soft: "",
          subtle: "",
        },
        size: {
          xs: {
            heading: "text-xs",
            cell: "text-xs",
            headCell: "text-[10px]",
            cellTrigger: "size-7",
            body: "space-y-2 pt-2",
          },
          sm: {
            heading: "text-xs",
            headCell: "text-xs",
            cell: "text-xs",
            cellTrigger: "size-7",
          },
          md: {
            heading: "text-sm",
            headCell: "text-xs",
            cell: "text-sm",
            cellTrigger: "size-8",
          },
          lg: {
            heading: "text-md",
            headCell: "text-md",
            cellTrigger: "size-9 text-md",
          },
          xl: {
            heading: "text-lg",
            headCell: "text-lg",
            cellTrigger: "size-10 text-lg",
          },
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class: {
            cellTrigger: "data-[selected]:bg-primary data-[selected]:text-inverted data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20",
          },
        },
        {
          color: "primary",
          variant: "outline",
          class: {
            cellTrigger: "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-primary/50 data-[selected]:text-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/10 hover:not-data-[selected]:bg-primary/10",
          },
        },
        {
          color: "primary",
          variant: "soft",
          class: {
            cellTrigger: "data-[selected]:bg-primary/10 data-[selected]:text-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20",
          },
        },
        {
          color: "primary",
          variant: "subtle",
          class: {
            cellTrigger: "data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-primary/25 data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20",
          },
        },
        {
          color: "neutral",
          variant: "solid",
          class: {
            cellTrigger: "data-[selected]:bg-inverted data-[selected]:text-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10",
          },
        },
        {
          color: "neutral",
          variant: "outline",
          class: {
            cellTrigger: "data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-[selected]:text-default data-[selected]:bg-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/10 hover:not-data-[selected]:bg-inverted/10",
          },
        },
        {
          color: "neutral",
          variant: "soft",
          class: {
            cellTrigger: "data-[selected]:bg-elevated data-[selected]:text-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10",
          },
        },
        {
          color: "neutral",
          variant: "subtle",
          class: {
            cellTrigger: "data-[selected]:bg-elevated data-[selected]:text-default data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10",
          },
        },
      ],
      defaultVariants: {
        size: "md",
        color: "primary",
        variant: "solid",
      },
    },
    toast: {
      slots: {
        root: "relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none",
        wrapper: "w-0 flex-1 flex flex-col",
        title: "text-sm font-medium text-netral-100",
        description: "text-sm text-netral-60",
        icon: "shrink-0 size-5",
        avatar: "shrink-0",
        avatarSize: "2xl",
        actions: "flex gap-1.5 shrink-0",
        progress: "absolute inset-x-0 bottom-0",
        close: "p-0",
      },
      variants: {
        color: {
          primary: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
            icon: "text-primary",
          },
          secondary: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary",
            icon: "text-secondary",
          },
          success: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
            icon: "text-success",
          },
          info: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
            icon: "text-info",
          },
          warning: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
            icon: "text-warning",
          },
          error: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
            icon: "text-error",
          },
          neutral: {
            root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
            icon: "text-highlighted",
          },
        },
        orientation: {
          horizontal: {
            root: "items-center",
            actions: "items-center",
          },
          vertical: {
            root: "items-start",
            actions: "items-start mt-2.5",
          },
        },
        title: {
          true: {
            description: "mt-1",
          },
        },
      },
      defaultVariants: {
        color: "primary",
      },
    },
    table: {
      slots: {
        root: "relative overflow-auto border border-netral-20 rounded-xl shadow-md",
        base: "min-w-full overflow-clip",
        caption: "sr-only",
        thead: "relative",
        tbody: "divide-y divide-netral-20 [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary",
        tfoot: "relative",
        tr: "data-[selected=true]:bg-elevated/50",
        th: "px-4 py-3.5 text-sm text-netral-100 text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0",
        td: "p-4 text-sm text-netral-60 whitespace-nowrap [&:has([role=checkbox])]:pe-0",
        separator: "absolute z-[1] left-0 w-full h-px bg-netral-20",
        empty: "py-6 text-center text-sm text-muted",
        loading: "py-6 text-center",
      },
      variants: {
        pinned: {
          true: {
            th: "sticky bg-bg-01/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0",
            td: "sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0",
          },
        },
        sticky: {
          true: {
            thead: "sticky top-0 inset-x-0 bg-bg-01/75 z-[1] backdrop-blur",
            tfoot: "sticky bottom-0 inset-x-0 bg-bg-01/75 z-[1] backdrop-blur",
          },
          header: {
            thead: "sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur",
          },
          footer: {
            tfoot: "sticky bottom-0 inset-x-0 bg-default/75 z-[1] backdrop-blur",
          },
        },
        loading: {
          true: {
            thead: "after:absolute after:z-[1] after:h-px",
          },
        },
        loadingAnimation: {
          "carousel": "",
          "carousel-inverse": "",
          "swing": "",
          "elastic": "",
        },
        loadingColor: {
          primary: "",
          secondary: "",
          success: "",
          info: "",
          warning: "",
          error: "",
          neutral: "",
        },
      },
      compoundVariants: [
        {
          loading: true,
          loadingColor: "primary",
          class: {
            thead: "after:bg-primary",
          },
        },
        {
          loading: true,
          loadingColor: "neutral",
          class: {
            thead: "after:bg-inverted",
          },
        },
        {
          loading: true,
          loadingAnimation: "carousel",
          class: {
            thead: "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]",
          },
        },
        {
          loading: true,
          loadingAnimation: "carousel-inverse",
          class: {
            thead: "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]",
          },
        },
        {
          loading: true,
          loadingAnimation: "swing",
          class: {
            thead: "after:animate-[swing_2s_ease-in-out_infinite]",
          },
        },
        {
          loading: true,
          loadingAnimation: "elastic",
          class: {
            thead: "after:animate-[elastic_2s_ease-in-out_infinite]",
          },
        },
      ],
      defaultVariants: {
        loadingColor: "primary",
        loadingAnimation: "carousel",
      },
    },
  },
});

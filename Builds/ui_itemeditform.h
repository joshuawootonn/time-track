/********************************************************************************
** Form generated from reading UI file 'itemeditform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_ITEMEDITFORM_H
#define UI_ITEMEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QVBoxLayout>

QT_BEGIN_NAMESPACE

class Ui_ItemEditForm
{
public:
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QLineEdit *name;
    QLabel *error;
    QHBoxLayout *horizontalLayout_2;
    QSpacerItem *horizontalSpacer;
    QPushButton *FinishButton;
    QPushButton *CancelButton;

    void setupUi(QDialog *ItemEditForm)
    {
        if (ItemEditForm->objectName().isEmpty())
            ItemEditForm->setObjectName(QStringLiteral("ItemEditForm"));
        ItemEditForm->resize(330, 90);
        verticalLayout = new QVBoxLayout(ItemEditForm);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(ItemEditForm);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout->addWidget(label);

        name = new QLineEdit(ItemEditForm);
        name->setObjectName(QStringLiteral("name"));

        horizontalLayout->addWidget(name);


        verticalLayout->addLayout(horizontalLayout);

        error = new QLabel(ItemEditForm);
        error->setObjectName(QStringLiteral("error"));

        verticalLayout->addWidget(error);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);

        FinishButton = new QPushButton(ItemEditForm);
        FinishButton->setObjectName(QStringLiteral("FinishButton"));

        horizontalLayout_2->addWidget(FinishButton);

        CancelButton = new QPushButton(ItemEditForm);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout->addLayout(horizontalLayout_2);


        retranslateUi(ItemEditForm);

        QMetaObject::connectSlotsByName(ItemEditForm);
    } // setupUi

    void retranslateUi(QDialog *ItemEditForm)
    {
        ItemEditForm->setWindowTitle(QApplication::translate("ItemEditForm", "Dialog", Q_NULLPTR));
        label->setText(QApplication::translate("ItemEditForm", "Name:", Q_NULLPTR));
        error->setText(QString());
        FinishButton->setText(QApplication::translate("ItemEditForm", "Finish", Q_NULLPTR));
        CancelButton->setText(QApplication::translate("ItemEditForm", "Cancel", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ItemEditForm: public Ui_ItemEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_ITEMEDITFORM_H

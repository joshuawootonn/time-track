/********************************************************************************
** Form generated from reading UI file 'shifteditform.ui'
**
** Created by: Qt User Interface Compiler version 5.7.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_SHIFTEDITFORM_H
#define UI_SHIFTEDITFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QDateTimeEdit>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_ShiftEditForm
{
public:
    QGridLayout *gridLayout;
    QVBoxLayout *verticalLayout_2;
    QHBoxLayout *horizontalLayout;
    QVBoxLayout *verticalLayout;
    QDateTimeEdit *DateTime1;
    QDateTimeEdit *DateTime2;
    QComboBox *Name;
    QComboBox *Projects;
    QComboBox *Items;
    QComboBox *Times;
    QComboBox *Lunch;
    QPushButton *Add;
    QPushButton *Delete;
    QTableWidget *Sections;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label;
    QLabel *timeLeft;
    QPushButton *FinishedButton;
    QPushButton *CancelButton;

    void setupUi(QWidget *ShiftEditForm)
    {
        if (ShiftEditForm->objectName().isEmpty())
            ShiftEditForm->setObjectName(QStringLiteral("ShiftEditForm"));
        ShiftEditForm->resize(572, 369);
        QFont font;
        font.setFamily(QStringLiteral("Calibri"));
        font.setPointSize(12);
        ShiftEditForm->setFont(font);
        gridLayout = new QGridLayout(ShiftEditForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        verticalLayout_2 = new QVBoxLayout();
        verticalLayout_2->setObjectName(QStringLiteral("verticalLayout_2"));
        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        verticalLayout = new QVBoxLayout();
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setSizeConstraint(QLayout::SetMinimumSize);
        DateTime1 = new QDateTimeEdit(ShiftEditForm);
        DateTime1->setObjectName(QStringLiteral("DateTime1"));

        verticalLayout->addWidget(DateTime1);

        DateTime2 = new QDateTimeEdit(ShiftEditForm);
        DateTime2->setObjectName(QStringLiteral("DateTime2"));

        verticalLayout->addWidget(DateTime2);

        Name = new QComboBox(ShiftEditForm);
        Name->setObjectName(QStringLiteral("Name"));

        verticalLayout->addWidget(Name);

        Projects = new QComboBox(ShiftEditForm);
        Projects->setObjectName(QStringLiteral("Projects"));
        Projects->setMaximumSize(QSize(250, 16777215));
        Projects->setSizeAdjustPolicy(QComboBox::AdjustToContents);

        verticalLayout->addWidget(Projects);

        Items = new QComboBox(ShiftEditForm);
        Items->setObjectName(QStringLiteral("Items"));
        Items->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Items);

        Times = new QComboBox(ShiftEditForm);
        Times->setObjectName(QStringLiteral("Times"));
        Times->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Times);

        Lunch = new QComboBox(ShiftEditForm);
        Lunch->setObjectName(QStringLiteral("Lunch"));

        verticalLayout->addWidget(Lunch);

        Add = new QPushButton(ShiftEditForm);
        Add->setObjectName(QStringLiteral("Add"));
        Add->setMinimumSize(QSize(250, 0));
        Add->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Add);

        Delete = new QPushButton(ShiftEditForm);
        Delete->setObjectName(QStringLiteral("Delete"));
        Delete->setMaximumSize(QSize(250, 16777215));

        verticalLayout->addWidget(Delete);


        horizontalLayout->addLayout(verticalLayout);

        Sections = new QTableWidget(ShiftEditForm);
        Sections->setObjectName(QStringLiteral("Sections"));
        Sections->verticalHeader()->setMinimumSectionSize(30);

        horizontalLayout->addWidget(Sections);


        verticalLayout_2->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label = new QLabel(ShiftEditForm);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout_2->addWidget(label);

        timeLeft = new QLabel(ShiftEditForm);
        timeLeft->setObjectName(QStringLiteral("timeLeft"));

        horizontalLayout_2->addWidget(timeLeft);

        FinishedButton = new QPushButton(ShiftEditForm);
        FinishedButton->setObjectName(QStringLiteral("FinishedButton"));

        horizontalLayout_2->addWidget(FinishedButton);

        CancelButton = new QPushButton(ShiftEditForm);
        CancelButton->setObjectName(QStringLiteral("CancelButton"));

        horizontalLayout_2->addWidget(CancelButton);


        verticalLayout_2->addLayout(horizontalLayout_2);


        gridLayout->addLayout(verticalLayout_2, 0, 0, 1, 1);


        retranslateUi(ShiftEditForm);

        QMetaObject::connectSlotsByName(ShiftEditForm);
    } // setupUi

    void retranslateUi(QWidget *ShiftEditForm)
    {
        ShiftEditForm->setWindowTitle(QApplication::translate("ShiftEditForm", "Time-Track", 0));
        Add->setText(QApplication::translate("ShiftEditForm", "Add", 0));
        Delete->setText(QApplication::translate("ShiftEditForm", "Delete", 0));
        label->setText(QApplication::translate("ShiftEditForm", "Time left:", 0));
        timeLeft->setText(QString());
        FinishedButton->setText(QApplication::translate("ShiftEditForm", "Finished", 0));
        CancelButton->setText(QApplication::translate("ShiftEditForm", "Cancel", 0));
    } // retranslateUi

};

namespace Ui {
    class ShiftEditForm: public Ui_ShiftEditForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_SHIFTEDITFORM_H
